import pandas as pd, json, textwrap, html

file_path = "C:/Users/LENOVO/Desktop/2025 KDMHS/교과/정보통신/webprojec/data/num.xlsx"
df = pd.read_excel(file_path)
records = df.to_dict(orient="records")
json_str = json.dumps(records, ensure_ascii=False, indent=2)
# display first part trimmed?
print(json_str)
