async function loadMusicals() {

  const response =
      await fetch('../data/reservation-data.xlsx');

  const buffer =
      await response.arrayBuffer();

  const workbook =
      XLSX.read(buffer, {
          type: 'array'
      });

  const sheet =
      workbook.Sheets[
          workbook.SheetNames[0]
      ];

  return XLSX.utils.sheet_to_json(sheet);

}