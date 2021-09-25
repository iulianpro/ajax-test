function getData(url, cb) {
    var loaderElement = document.getElementById('loader');
    loaderElement.classList.remove('d-none');
    loaderElement.classList.add('d-inline-block');
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            cb(JSON.parse(this.responseText));
        }
    };

    xhr.open("GET", url);
    xhr.send();
}

function getTableHeaders(obj) {
    var tableHeaders = [];

    Object.keys(obj).forEach(function (key) {
        tableHeaders.push(`<td class="text-uppercase">${key}</td>`)
    });
    console.log(Object)

    return `<tr>${tableHeaders}</tr>`;
}

function generatePaginationButtons(next, prev) {
    if (next && prev) {
        return `<button class="btn btn-primary my-3 ml-5" onclick="writeToDocument('${prev}')">Previous</button>
                <button class="btn btn-primary my-3 ml-2" onclick="writeToDocument('${next}')">Next</button>`;
    } else if (next && !prev) {
        return `<button class="btn btn-primary my-3 ml-5" onclick="writeToDocument('${next}')">Next</button>`;
    } else if (!next && prev) {
        return `<button class="btn btn-primary my-3 ml-5" onclick="writeToDocument('${prev}')">Previous</button>`;
    }
}

function writeToDocument(url) {
    var tableRows = [];
    var el = document.getElementById("data");

    getData(url, function (data) {
        var pagination = '';

        if (data.next || data.previous) {
            pagination = generatePaginationButtons(data.next, data.previous);
        }
        data = data.results;
        var tableHeaders = getTableHeaders(data[0]);
        console.log(data);

        data.forEach(function (item) {
            var dataRow = [];

            Object.keys(item).forEach(function (key) {
                var rowData = item[key].toString();
                var truncateData = rowData.substring(0, 10);
                dataRow.push(`<td class="p-2">${truncateData}</td>`);
            });
            tableRows.push(`<tr>${dataRow}</tr>`)
        });

        el.innerHTML = `<table class="table table-bordered">${tableHeaders}${tableRows}</table>${pagination}`.replace(/,/g, '');
        var loaderElement = document.getElementById('loader');
        loaderElement.classList.remove('d-inline-block');
        loaderElement.classList.add('d-none');
    });
}