import React from 'react'
import { Chart as ChartJS, registerables } from 'chart.js';
import { Line, Bar, Doughnu, Pie } from 'react-chartjs-2'
ChartJS.register(...registerables);

export default function Dashboard() {
  return (
    <div className="db">
            <div className="db__row">
                <div className="db__col-4 mgr10">
                    <div className="dbbox">
                        <div>
                            <h4>Total Courses</h4>
                            <p>Last year expenses</p>
                        </div>
                        <div className>
                            <span></span>
                        </div>
                    </div>
                </div>
                <div className="db__col-4 mgl10 mgr10">
                    <div className="dbbox">
                        <div>
                            <h4>Total User learn</h4>
                            <p>Last year expenses</p>
                        </div>
                        <div>
                            <span></span>
                        </div>
                    </div>
                </div>
                <div className="db__col-4 mgl10">
                    <div className="dbbox">
                        <div>
                            <h4>Total </h4>
                            <p>Last year expenses</p>
                        </div>
                        <div>
                            <span></span>
                        </div>
                    </div>
                </div>
                
            </div>
            <div className="db__row">
                <div className="col6 mgr10">
                    <div className="dbitem">
                    <h3 className="text-center">Courses All</h3>
                        <Bar
                            data={{
                                labels: [1, 2, 3, 4, 5],
                                datasets: [
                                    {
                                        label: "Like",
                                        backgroundColor: [
                                            "rgba(255, 0, 132, 0.2)"
                                        ],
                                        data:"12321",
                                        borderColor: "rgba(255, 0, 132, 1)",
                                        fill: "start",
                                        borderWidth: 0.5
                                    },
                                    {
                                        label: "Dislike",
                                        backgroundColor: [
                                            "rgba(0, 168, 255, 0.2)"
                                        ],
                                        data: "a1232321321",
                                        borderColor: "rgba(0, 168, 255, 1)",
                                        fill: "start",
                                        borderWidth: 0.5
                                    },
                                    {
                                        label: "Comment",
                                        backgroundColor: [
                                            "rgba(93, 13, 54, 0.8)"
                                        ],
                                        data: "12321",
                                        borderColor: "rgba(93, 13, 54, 0.8)",
                                        fill: "start",
                                        borderWidth: 0.5
                                    },
                                    {
                                        label: "View",
                                        backgroundColor: [
                                            "rgba(120, 255, 0, 0.2)"
                                        ],
                                        data:"213123",
                                        borderColor: "rgba(120,255,0, 1)",
                                        fill: "start",
                                        borderWidth: 0.5
                                    }
                                ],
                            }}
                            options={{
                                legend: { display: false },
                                title: {
                                    display: true,
                                    text: "Predicted world population (millions) in 2050"
                                }
                            }}
                        />
                    </div>
                </div>
                <div className="col7">
                    <div className="col7__item">
                        <Line
                            data={{
                                labels: [1, 2, 3, 4, 5],
                                datasets: [
                                    {
                                        label: "Like",
                                        backgroundColor: [
                                            "rgba(255, 0, 132, 0.1)"
                                        ],
                                        data: "212312",
                                        borderColor: "rgba(255, 0, 132, 1)",
                                        fill: "start",
                                        borderWidth: 0.5
                                    },
                                    {
                                        label: "Comment",
                                        backgroundColor: [
                                            "rgba(93, 13, 54, 0.1)"
                                        ],
                                        data: "12321",
                                        borderColor: "rgba(0, 168, 255, 1)",
                                        fill: "start",
                                        borderWidth: 0.5
                                    },
                                    {
                                        label: "View",
                                        backgroundColor: [
                                            "rgba(120, 255, 0, 0.1)"
                                        ],
                                        data: "12312321 ",
                                        borderColor: "rgba(120,255,0, 1)",
                                        fill: "start",
                                        borderWidth: 0.5
                                    },
                                    {
                                        label: "Dislike",
                                        backgroundColor: [
                                            "rgba(0, 168, 255, 0.1)"
                                        ],
                                        data: "12321321",
                                        borderColor: "rgba(0, 168, 255, 1)",
                                        fill: "start",
                                        borderWidth: 0.5
                                    }
                                ],
                            }}
                            options={{
                                legend: { display: false },
                                title: {
                                    display: true,
                                    text: "Predicted world population (millions) in 2050"
                                }
                            }}
                        />

                    </div>
                    <div className="col7__item">
                    <h3 className="text-center">User register Courses</h3>
                        <Pie
                            data={{
                                labels: [1, 2, 3, 4, 5],
                                datasets: [
                                    {
                                        label: "All post",
                                        backgroundColor: [
                                            'rgba(255, 0, 132, 0.2)',
                                            'rgba(93, 13, 54, 0.8)',
                                            'rgba(120, 255, 0, 0.2)',
                                            'rgba(0, 168, 255, 0.2)'
                                        ],
                                        data: "12321321",
                                        
                                        fill: "start",
                                        borderWidth: 0.5
                                    },
                                ],
                            }}
                            options={{
                                legend: { display: false },
                                title: {
                                    display: true,
                                    text: "Predicted world population (millions) in 2050"
                                }
                            }}
                        />
                    </div>
                    <div className="col7__item">
                    </div>
                </div>
            </div>
            <div className="db__row">
                <div className="col1">
                    <div className="dbitem">

                    </div>
                </div>
            </div>
        </div>
  )
}
