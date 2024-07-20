from pymongo import MongoClient
import re
import time


def convert_to_standard_units(value, unit):
    """
    Converts value to standard units (V or A).
    Assumes the input value is a string ending with the unit (e.g., '800mA' or '1.4V').
    """

    numeric_value = float(value.replace(unit, ''))
    if 'mV' in unit or "mA" in unit:
        return numeric_value / 1000  # Convert mV to V
    elif 'µV' in unit or "µA" in unit:
        return numeric_value / 1000000  # Convert µA to A
    else:
        return numeric_value


def extract_and_update_data():
    # Connect to MongoDB
    client = MongoClient('mongodb://localhost:27017/')
    db = client['digikey']
    db2 = client['powerSizer']

    # Source and destination collections
    source = db['regulators']
    dest = db2['regulators']  # New collection for numeric data

    # Filter for documents with type: "Fixed"
    filter = {'type': 'Fixed'}

    # Find all documents matching the filter
    documents = source.find(filter)
    dest_docs = []

    for doc in documents:

        try:
            new_doc = {
                "name": doc["name"],
                "outputSign": doc["outputSign"],
                "type": doc["type"],
                "mountType": doc["mountType"],
                "datasheet": doc["datasheet"]
            }
            # Extract and convert values
            vInMax = convert_to_standard_units(doc.get('vInMax', ''), 'V')
            vOutMin = convert_to_standard_units(doc.get('vOutMin', ''), 'V')

            vDrop_parts = doc["vDrop"].split("@")
            v_part = vDrop_parts[0].strip()
            i_part = vDrop_parts[1].strip()
            s_p = re.compile(r'([\d.]+)')
            i_part_match = s_p.match(i_part)
            v_part_match = s_p.match(v_part)
            vDrop = iDrop = 0
            print(i_part, v_part)
            if i_part_match:
                iDrop = convert_to_standard_units(i_part_match.group(1),
                                                  i_part)
            if v_part_match:
                vDrop = convert_to_standard_units(v_part_match.group(1),
                                                  v_part)
            print(v_part_match, i_part_match)
            # Prepare the update object
            new_doc = {
                'vInMax': vInMax,
                'vOutMin': vOutMin,
                'vDrop': vDrop,
                'iDrop': iDrop
            }

            dest.insert_one(new_doc)

        except Exception as e:
            print(doc[id])

    # Update all now

    client.close()


if __name__ == "__main__":
    extract_and_update_data()
