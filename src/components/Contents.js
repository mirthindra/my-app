/* eslint-disable */
import React, { useState, useEffect } from "react";
//const axios = require("axios").default;
import axios from "axios";
import cors from "cors";
import { Bar, Doughnut, Line } from "react-chartjs-2";

// Make a request for a user with a given ID
const Contents = () => {
  const [confirmedData, setConfirmedData] = useState({});
  const [activeData, setActiveData] = useState({});

  console.log(confirmedData);

  useEffect(() => {
    console.log("useEffect");
    // const fetchEvents = () => {
    //   const res = axios
    //     .get("https://api.covid19api.com/total/country/kr")
    //     .then(function (response) {
    //       console.log(response);
    //     })
    //     .catch(function (error) {
    //       console.log(error);
    //     });
    // };

    console.log("async,await");

    const fetchEvents = async () => {
      const res = await axios.get(
        "https://api.covid19api.com/total/country/kr",
      );
      // console.log(res);
      makeData(res.data);
    };

    const makeData = items => {
      // console.log(items);
      const arr = items.reduce((acc, cur) => {
        // reduce 를 통해 누산값과 현재값을 비교하기 위한 작업을 수행한다.
        // 현재값에 해당하는 데이터를 필드별로 분리한다.
        const currentDate = new Date(cur.Date);
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const day = currentDate.getDate();
        //console.log(year, month, day);

        const confirmed = cur.Confirmed;
        const active = cur.Active;
        const deaths = cur.Deaths;
        const province = cur.Province;
        const recovered = cur.Recovered;

        // 누산된 값중 현재값의 동년 동월 자료를 추출한다. (ref)
        const findItem = acc.find(a => a.year === year && a.month === month);

        // 만약 추출된 값이 없다면 누산값에 추가한다.
        if (!findItem) {
          acc.push({
            year,
            month,
            day,
            confirmed,
            active,
            deaths,
            province,
            recovered,
          });
        }
        // console.log("acc");
        // console.log(acc);

        // 누산값이 있으나, 현재보다 과거일일 경우 현재값으로 갱신한다. (매 월 마지막 값만 남김)
        if (findItem && findItem.day < day) {
          findItem.year = year;
          findItem.month = month;
          findItem.day = day;

          findItem.confirmed = confirmed;
          findItem.active = active;
          findItem.deaths = deaths;
          findItem.province = province;
          findItem.recovered = recovered;
        }
        // 누산값을 반환한다.
        return acc;
      }, []);
      // console.log(arr);

      console.log("arr");
      console.log(arr);

      // 그래프 데이터 적용
      //label 작성
      const labels = arr.map(
        value => value.year + "년 " + (value.month + 1) + "월",
      );
      // data (확진자) 작성
      //const data = arr.map(value => value.confirmed);

      setConfirmedData({
        //labels: ["1월", "2월", "3월"],
        labels,
        datasets: [
          {
            label: "국내 누적 확진자",
            backgroundColor: "salmon",
            fill: true,
            //data: [10, 5, 3],
            data: arr.map(value => value.confirmed),
          },
        ],
      });

      setActiveData({
        //labels: ["1월", "2월", "3월"],
        labels,
        datasets: [
          {
            label: "국내 격리자 현황",
            borderColor: "blue",
            fill: false,
            //data: [10, 5, 3],
            data: arr.map(value => value.active),
          },
        ],
      });

      //
    };

    fetchEvents();
  });

  return (
    <section>
      <h2>국내 코로나 현황</h2>
      <div className="contents">
        <div>
          <Bar
            data={confirmedData}
            options={
              ({ title: { display: true, text: "new Bar Chart" } },
              { legend: { display: true, position: "bottom" } })
            }
          ></Bar>
        </div>
        <div>
          <Line
            data={confirmedData}
            options={
              ({ title: { display: true, text: "new Bar Chart" } },
              { legend: { display: true, position: "bottom" } })
            }
          ></Line>
        </div>
      </div>
    </section>
  );
};

export default Contents;

/* eslint-disable */
