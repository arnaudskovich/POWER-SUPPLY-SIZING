import tkinter as tk
from tkinter import ttk, messagebox
import json
import requests


class PowerSupplyDimensioner:

    def __init__(self, master):
        self.master = master
        master.title("Power Supply Sizing")
        master.geometry("700x650")

        # Input variables for fixed output
        self.fixed_input_voltage = tk.DoubleVar(value=230)
        self.fixed_input_frequency = tk.DoubleVar(value=50)
        self.fixed_output_voltage = tk.DoubleVar()
        self.fixed_output_current = tk.DoubleVar()

        # Input variables for adjustable output
        self.adj_input_voltage = tk.DoubleVar(value=230)
        self.adj_input_frequency = tk.DoubleVar(value=50)
        self.adj_output_voltage_min = tk.DoubleVar()
        self.adj_output_voltage_max = tk.DoubleVar()
        self.adj_output_current = tk.DoubleVar()

        # Create and place widgets
        self.create_widgets()

    def create_widgets(self):
        # Create notebook (tabbed interface)
        notebook = ttk.Notebook(self.master)
        notebook.pack(fill="both", expand=True, padx=10, pady=10)

        # Fixed Output tab
        fixed_frame = ttk.Frame(notebook)
        notebook.add(fixed_frame, text="Sortie fixe")
        self.create_fixed_output_widgets(fixed_frame)

        # Adjustable Output tab
        adj_frame = ttk.Frame(notebook)
        notebook.add(adj_frame, text="Sortie réglable")
        self.create_adjustable_output_widgets(adj_frame)

        # Results frame
        self.results_frame = ttk.LabelFrame(self.master, text="Résultats")
        self.results_frame.pack(padx=10, pady=10, fill="both", expand=True)

        # Scrollable text widget for results
        self.results_text = tk.Text(self.results_frame,
                                    wrap=tk.WORD,
                                    width=80,
                                    height=20)
        self.results_text.pack(padx=5, pady=5, fill="both", expand=True)
        scrollbar = ttk.Scrollbar(self.results_frame,
                                  orient="vertical",
                                  command=self.results_text.yview)
        scrollbar.pack(side="right", fill="y")
        self.results_text.configure(yscrollcommand=scrollbar.set)

    def create_fixed_output_widgets(self, parent):
        ttk.Label(parent, text="Tension secteur (V)").grid(row=0,
                                                           column=0,
                                                           sticky="e",
                                                           padx=5,
                                                           pady=5)
        ttk.Entry(parent, textvariable=self.fixed_input_voltage).grid(row=0,
                                                                      column=1,
                                                                      padx=5,
                                                                      pady=5)

        ttk.Label(parent, text="Fréquence secteur (Hz):").grid(row=1,
                                                               column=0,
                                                               sticky="e",
                                                               padx=5,
                                                               pady=5)
        ttk.Entry(parent,
                  textvariable=self.fixed_input_frequency).grid(row=1,
                                                                column=1,
                                                                padx=5,
                                                                pady=5)

        ttk.Label(parent, text="Tension de sortie (V)").grid(row=2,
                                                             column=0,
                                                             sticky="e",
                                                             padx=5,
                                                             pady=5)
        ttk.Entry(parent,
                  textvariable=self.fixed_output_voltage).grid(row=2,
                                                               column=1,
                                                               padx=5,
                                                               pady=5)

        ttk.Label(parent, text="Courant max (mA)").grid(row=3,
                                                       column=0,
                                                       sticky="e",
                                                       padx=5,
                                                       pady=5)
        ttk.Entry(parent,
                  textvariable=self.fixed_output_current).grid(row=3,
                                                               column=1,
                                                               padx=5,
                                                               pady=5)

        ttk.Button(parent, text="Evaluer",
                   command=self.calculate_fixed).grid(row=4,
                                                      column=0,
                                                      columnspan=2,
                                                      pady=10)

    def create_adjustable_output_widgets(self, parent):
        ttk.Label(parent, text="Tension secteur (V)").grid(row=0,
                                                           column=0,
                                                           sticky="e",
                                                           padx=5,
                                                           pady=5)
        ttk.Entry(parent, textvariable=self.adj_input_voltage).grid(row=0,
                                                                    column=1,
                                                                    padx=5,
                                                                    pady=5)

        ttk.Label(parent, text="Fréquence secteur (Hz):").grid(row=1,
                                                               column=0,
                                                               sticky="e",
                                                               padx=5,
                                                               pady=5)
        ttk.Entry(parent, textvariable=self.adj_input_frequency).grid(row=1,
                                                                      column=1,
                                                                      padx=5,
                                                                      pady=5)

        ttk.Label(parent, text="Tension de sortie min (V)").grid(row=2,
                                                                 column=0,
                                                                 sticky="e",
                                                                 padx=5,
                                                                 pady=5)
        ttk.Entry(parent,
                  textvariable=self.adj_output_voltage_min).grid(row=2,
                                                                 column=1,
                                                                 padx=5,
                                                                 pady=5)

        ttk.Label(parent, text="Tension de sortie max (V)").grid(row=3,
                                                                 column=0,
                                                                 sticky="e",
                                                                 padx=5,
                                                                 pady=5)
        ttk.Entry(parent,
                  textvariable=self.adj_output_voltage_max).grid(row=3,
                                                                 column=1,
                                                                 padx=5,
                                                                 pady=5)

        ttk.Label(parent, text="Courant max (mA)").grid(row=4,
                                                       column=0,
                                                       sticky="e",
                                                       padx=5,
                                                       pady=5)
        ttk.Entry(parent, textvariable=self.adj_output_current).grid(row=4,
                                                                     column=1,
                                                                     padx=5,
                                                                     pady=5)

        ttk.Button(parent, text="Evaluer",
                   command=self.calculate_adjustable).grid(row=5,
                                                           column=0,
                                                           columnspan=2,
                                                           pady=10)

    def calculate_fixed(self):
        try:
            # Here you would typically make a POST request to your backend for fixed output
            # For demonstration, we'll create a mock results object
            
            json = {
                "vOut":self.fixed_output_voltage.get(),
                "iOut":self.fixed_output_current.get(),
                "vIn":self.fixed_input_voltage.get(),
                "vInFrequency":self.fixed_input_frequency.get()
            }
            
            res = requests.post("http://localhost:6789/size/fixed/unique", json=json)

            res_j = res.json()
            
            
            
            results = res_j

            self.display_results(results)

        except tk.TclError:
            messagebox.showerror(
                "Error", "Please enter valid numeric values for all fields.")

    def calculate_adjustable(self):
        try:
            # Here you would typically make a POST request to your backend for adjustable output
            # For demonstration, we'll create a mock results object
            results = {
                "Power Supply Type": "Adjustable Output",
                "Transformer Secondary Voltage": f"{48:.2f} V",
                "Transformer Secondary Current": f"{1.1:.2f} A",
                "Filter Capacitor": "4000 μF",
                "Regulator": "LM317",
                "Rectifier": "Bridge rectifier",
                "Rectifier Diodes": "1N5404",
                "Voltage Drop in Regulator": f"{3:.1f} V",
                "Voltage Drop in Rectifier": f"{1.4:.1f} V",
                "Transformer Efficiency": "80%",
                "Estimated Output Ripple": f"{100:.2f} mV",
                "Recommended Heat Sink": "TO-220 type, 5°C/W",
                "Estimated Max Power Dissipation": f"{15:.2f} W",
                "Adjustment Resistor (R1)": "240 Ω",
                "Potentiometer (R2)": "5 kΩ"
            }

            self.display_results(results)

        except tk.TclError:
            messagebox.showerror(
                "Error", "Please enter valid numeric values for all fields.")

    def display_results(self, results):
        self.results_text.delete('1.0', tk.END)  # Clear previous results
        
        stages = ['regulateur', 'filtrage', 'redresseur', 'transformateur']
        
        for stage in stages:
            if stage in results:
                self.results_text.insert(tk.END, f"\n{stage.upper()}\n")
                self.results_text.insert(tk.END, "="*20 + "\n")
                
                for key, value in results[stage].items():
                    if key == '_id':
                        continue  # Skip the _id field
                    
                    # Format the value based on its type
                    if isinstance(value, (int, float)):
                        formatted_value = f"{value:,}"
                    elif isinstance(value, str):
                        formatted_value = value
                    else:
                        formatted_value = str(value)
                    
                    # Capitalize the first letter of the key
                    formatted_key = key.capitalize()
                    
                    self.results_text.insert(tk.END, f"{formatted_key}: {formatted_value}\n")
                
                self.results_text.insert(tk.END, "\n")  # Add an extra newline for spacing between stages

        # Apply some basic styling
        self.results_text.tag_configure("bold", font=("TkDefaultFont", 10, "bold"))
        self.results_text.tag_add("bold", "1.0", "end-1c linestart")


root = tk.Tk()
app = PowerSupplyDimensioner(root)
root.mainloop()
