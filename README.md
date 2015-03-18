# spreadsheet_to_ebook
I'm converting [a series of Chinese books into eBooks](https://github.com/gigifrias/Chinese-Ebooks) for Voice of America. I needed a way to simplify the addition and editing of meta data and content. We're using the ePub3 format, which is basically a series of XHTML documents that are zipped together using a very specific structure. Because I don't speak Chinese, the idea of manually trying copy and paste the text into the appropriate tags throughout the book seemed tedious and destined for errors.

###How it works
I created an Express Node application that uses a Google spreadsheet to provide the data. [The spreadsheet](https://docs.google.com/spreadsheets/d/1dXbUkXlGb8GyVMdKpuJB__82MAI6-VWqhzcvq2A3rYY/pubhtml) has four sheets (Config, Meta, Chapters and Photos). I shared the document with editors who can make corrections to the Chinese and English translations. 

I'm using [Tabletop.js](https://github.com/jsoma/tabletop) to simplify working with the published spreadsheet. I save the data to a series of files: config.json, meta.json, chapters.json and photos.json. I use setInterval to periodically update the files with edits from the spreadsheets.

By using a single source for the data, I can ensure that changes to chapter titles are accurately reflected in the table of contents and the chapter itself. That images that appear in the book are listed in the required content.opf document. And that edits remain current.

###Still to come
I need to simplify the process for batch exporting the books into separate folders.
