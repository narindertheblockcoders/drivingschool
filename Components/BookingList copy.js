const currentDatePicker = () => {
    const inputDate = new Date();

    const day = inputDate.getDate();
    const month = inputDate.getMonth() + 1; // Adding 1 because getMonth() returns 0-11
    const year1 = inputDate.getFullYear();

    // Pad single-digit day and month with leading zeros
    const formattedDay = String(day).padStart(2, "0");
    const formattedMonth = String(month).padStart(2, "0");

    const date2 = `${formattedDay}/${formattedMonth}/${year1}`;
    console.log(date2, "date2 here");
    const d = date2.split("/");
    console.log(d, "date string this");
    setYearMonth(`${d[2]}-${d[1]}`);
    setDate3(`${d[2]}-${d[1]}`);
    
    dayPicker(convertedDate);
  };

//   old

// const currentDatePicker = () => {
//     const dateObj = new Date();
//     const monthStr = dateObj.toLocaleString("default", { month: "short" });



//     const formattedDateStr = `${dateObj.getFullYear()}-${monthStr}`;
//     const date2 = new Date().toLocaleDateString();
//     const d = date2.split("/");

//     const convertedDate = formattedDateStr.split("-")[1];
//     console.log(convertedDate,"converter")
//     setYearMonth(`${d[2]}-${d[1]}`);
//     setDate3(`${d[2]}-${d[1]}`);
//     dayPicker(convertedDate);
//   };