import os
import json

def summarize_directory(directory="."):
    """
    Summarizes the directory structure into a JSON file.
    """
    data = {"files": [], "folders": []}

    for root, dirs, files in os.walk(directory):
        for name in files:
            full_path = os.path.join(root, name)
            data["files"].append(full_path)
        for name in dirs:
            full_path = os.path.join(root, name)
            data["folders"].append(full_path)

    with open("directory_summary.json", "w") as f:
        json.dump(data, f, indent=4)

    print(f"Directory summary saved to directory_summary.json in '{os.path.abspath(directory)}'")

if __name__ == "__main__":
    summarize_directory()