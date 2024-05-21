import fs from "fs";


const  LIST_OF_FILES = {
    "home": "home.json",
    "shoes": "shoes.json",
}

const NAME_OF_MERGED_FILE = "all_merged.json";


const files = Object.entries(LIST_OF_FILES).map(([key, filename]) => {
    const data = JSON.parse(fs.readFileSync(filename, 'utf8'));
    return data.map(item => ({...item, key}))
});


const mergedData = files.flat();

fs.writeFileSync(NAME_OF_MERGED_FILE, JSON.stringify(mergedData));
