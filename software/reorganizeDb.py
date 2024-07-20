from pymongo import MongoClient
import re

# Connect to MongoDB
client = MongoClient('mongodb://localhost:27017/')
db = client['digikey']
db2 = client['powerSizer']

# Source and destination collections
source_collection = db['regulators']
dest_collection = db2['regulators']  # New collection for numeric data


def transform_document(doc):
    """Transform document to numeric values."""
    new_doc = {
        "_id": doc["_id"],
        "name": doc["name"],
        "outputSign": doc["outputSign"],
        "type": doc["type"],
        "mountType": doc["mountType"]
    }

    # Transform numeric fields
    numeric_fields = {
        "vInMax": "V",
        "vOutMin": "V",
        "vOutMax": "V",
        "vDrop": "V",
        "iOut": "A",
        "iq": "A",
        "pssr": "dB"
    }

    # for field, unit in numeric_fields.items():
    #     value = extract_numeric_value(doc.get(field, ""))
    #     if value is not None:
    #         new_doc[field] = value
    #         new_doc[f"{field}_unit"] = unit

    # Handle temperature range
    temp_range = doc.get("temperature", "")
    temp_min, temp_max = re.findall(r'([-+]?\d+)', temp_range)
    new_doc["tempMin"] = int(temp_min)
    new_doc["tempMax"] = int(temp_max)
    new_doc["tempUnit"] = "°C"

    return new_doc


# Main process
def process_regulators():
    for doc in source_collection.find():
        new_doc = transform_document(doc)
        dest_collection.insert_one(new_doc)
        print(f"Processed: {doc['name']}")


if __name__ == "__main__":
    process_regulators()
    print("Processing complete.")
