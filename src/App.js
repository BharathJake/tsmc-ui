import React, { useState } from "react";
import { Table } from "antd";
import AddRowForm from "./Components/AddRowForm";
import UploadFileForm from "./Components/UploadFileForm";
import axios from "axios";

function App() {
  const [data, setData] = useState([]);
  const [sourceFile, setSourceFile] = useState();
  const [targetFile, setTargetFile] = useState();

  const handleAddRow = (newRow) => {
    setData([newRow, ...data]);
    const formData = new FormData();
    formData.append("newRow", JSON.stringify(newRow));
    formData.append("files", sourceFile);
    formData.append("files", targetFile);
    axios
      .post("http://localhost:3001/addRow", formData, {
        responseType: "blob",
      })
      .then((response) => {
        const blob = new Blob([response.data], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });

        const url = window.URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "modifiedFile.xlsx");
        document.body.appendChild(link);
        link.click();

        window.URL.revokeObjectURL(url);
      })
      .catch((error) => {
        console.error("Error adding row to backend:", error);
      });
  };

  const handleFile1Upload = (sheetData, sf) => {
    setData(sheetData);
    setSourceFile(sf);
  };

  const handleFile2Upload = (tf) => {
    setTargetFile(tf);
  };

  const columns = [
    {
      title: "BRAND NAME",
      dataIndex: "BRAND NAME",
      key: "BRAND NAME",
    },
    {
      title: "SHOP NO",
      dataIndex: "SHOP NO",
      key: "SHOP NO",
    },
    {
      title: "CODE NO",
      dataIndex: "CODE NO",
      key: "CODE NO",
    },
    {
      title: "ML SIZE",
      dataIndex: "ML SIZE",
      key: "ML SIZE",
    },
    {
      title: "BOTTLES",
      dataIndex: "BOTTLES",
      key: "BOTTLES",
    },
    {
      title: "AMOUNT",
      dataIndex: "AMOUNT",
      key: "AMOUNT",
    },
    {
      title: "RATE",
      dataIndex: "RATE",
      key: "RATE",
    },
  ];

  return (
    <div className="App">
      <UploadFileForm onFileUpload={handleFile1Upload} isDataNeeded={true} />
      <UploadFileForm onFileUpload={handleFile2Upload} isDataNeeded={false} />
      <Table dataSource={data} columns={columns} />
      <AddRowForm columns={columns} onAddRow={handleAddRow} />
    </div>
  );
}

export default App;
