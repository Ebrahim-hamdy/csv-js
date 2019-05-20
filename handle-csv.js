const handleCsv = (() => {
  let formattedItems = [];

  const convertToCSV = objArray => {
    let str = "";

    const array = typeof objArray != "object" ? JSON.parse(objArray) : objArray;

    for (let i = 0; i < array.length; i += 1) {
      let line = "";

      for (let index in array[i]) {
        if (line != "") line += ",";

        line += array[i][index];
      }

      str += line + "\r\n";
    }

    return str;
  };

  const exportCSVFile = (headers, items, fileTitle) => {
    if (headers) {
      items.unshift(headers);
    }

    // Convert Object to JSON
    const jsonObject = JSON.stringify(items),
      csv = convertToCSV(jsonObject),
      exportedFilename = fileTitle + ".csv" || "export.csv",
      blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });

    if (navigator.msSaveBlob) {
      // IE 10+
      navigator.msSaveBlob(blob, exportedFilename);
    } else {
      const link = document.createElement("a");
      if (link.download !== undefined) {
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", exportedFilename);
        link.style.visibility = "hidden";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    }
  };

  const formatItem = (number, attributes) => {
    formattedItems.push({
      number: number,
      attributes: attributes
    });

    return formattedItems;
  };

  const download = () => {
    const headers = {
        number: "Number",
        attributes: "Attributes"
      },
      fileTitle = "even-odd-numbers";

    for (let i = 1; i <= 100; i += 1) {
      if (i % 2 === 0) {
        formattedItems =
          i % 3 === 0
            ? formatItem(i, "even, multiple-of-three")
            : formatItem(i, "even");
      } else {
        formattedItems =
          i % 3 === 0
            ? formatItem(i, "odd, multiple-of-three")
            : formatItem(i, "odd");
      }
    }

    exportCSVFile(headers, formattedItems, fileTitle);
  };

  return {
    download: download
  };
})();
