import React from "react";
import { Upload, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import * as XLSX from "xlsx";

function UploadFileForm({ onFileUpload, isDataNeeded }) {
  const handleFileChange = async (info) => {
    const file = info.file;
    if (file) {
      try {
        const reader = new FileReader();
        if (isDataNeeded) {
          reader.onload = async (e) => {
            const arrayBuffer = e.target.result;
            const workbook = XLSX.read(new Uint8Array(arrayBuffer), {
              type: "array",
            });
            const sheetName = workbook.SheetNames[0];
            const sheetData = XLSX.utils.sheet_to_json(
              workbook.Sheets[sheetName]
            );
            onFileUpload(sheetData, file);
          };
        } else {
          onFileUpload(file);
        }
        reader.readAsArrayBuffer(file);
      } catch (error) {
        console.error("Error reading file:", error);
      }
    }
  };

  return (
    <Upload
      onChange={handleFileChange}
      beforeUpload={() => false}
      showUploadList={true}
      accept=".xls,.xlsx"
    >
      <Button icon={<UploadOutlined />}>Upload Excel File</Button>
    </Upload>
  );
}

export default UploadFileForm;
