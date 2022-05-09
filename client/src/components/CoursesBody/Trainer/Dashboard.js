import React, { useEffect } from 'react'
import { Chart as ChartJS, registerables } from 'chart.js';
import { Line, Bar, Doughnu, Pie, Radar } from 'react-chartjs-2'
import { useDispatch, useSelector } from 'react-redux'
import { fetchDashBoardTrainer, dispatchDashBoardTrainer } from '../../../redux/actions/dashboardAction'

ChartJS.register(...registerables);

export default function Dashboard() {
    const dashboard = useSelector(state => state.dashboard)
    const token = useSelector(state => state.token)



    const { dashboardTrainer } = dashboard
    const { tokenTrainer } = token
    const dispatch = useDispatch()

    useEffect(() => {
        if (tokenTrainer) {
            fetchDashBoardTrainer(tokenTrainer).then(res => dispatch(dispatchDashBoardTrainer(res)))
        }
    }, [tokenTrainer, dispatch])
    console.log(dashboardTrainer)



    const numberCateOftutorial = () => {
        const numbercate = dashboardTrainer.cateNumber?.map(element => element.tutorial.length)
        return numbercate
    }
    const numberUserLikeCate = () => {
        const userLikeCate = dashboardTrainer.cateNumber?.map(element => element.likes_user.length)
        return userLikeCate
    }
    const nameCate = () => {
        const cateTutorial = dashboardTrainer.cateNumber?.map(element => element.name)
        return cateTutorial
    }
    const comment = () => {
        const commentutorial = dashboardTrainer.tutorialCate?.map(element => element.commnets.length)
        return commentutorial
    }
    const userRegister = () => {
        const numberUserRegister = dashboardTrainer.tutorialCate?.map(element => element.register.length)
        return numberUserRegister
    }
    const courseTutorial = () => {
        const numberCourses = dashboardTrainer.tutorialCate?.map(element => element.courseObj.length)
        return numberCourses
    }
    const nameTutorial = () => {
        const nameAlltutorial = dashboardTrainer.tutorialCate?.map(element => element.name)
        return nameAlltutorial
    }
    const userLiketoturial = () => {
        const userLikeCourses = dashboardTrainer.tutorialCate?.map(element => element.results.length)
        return userLikeCourses
    }
    console.log(numberCateOftutorial())
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
                            <span className="totalCourses">{dashboardTrainer.tutorialCate?.length}</span>
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
                            <span>{dashboardTrainer.dataRegister?.length}</span>
                        </div>
                    </div>
                </div>
                <div className="db__col-4 mgl10">
                    <div className="dbbox">
                        <div>
                            <h4>Total Category</h4>
                            <p>Last year expenses</p>
                        </div>
                        <div>
                            <span>{dashboardTrainer.cateNumber?.length}</span>
                        </div>
                    </div>
                </div>

            </div>
            <div className="db__row">
                <div className="col6 mgr10">
                    <div className="dbitem">
                        <h3 className="text-center">Tutorial All</h3>
                        <Bar
                            data={{
                                labels: nameTutorial(),
                                datasets: [
                                    {
                                        label: "Courses",
                                        backgroundColor: [
                                            "rgba(255, 0, 132, 0.2)"
                                        ],
                                        data: courseTutorial(),
                                        borderColor: "rgba(255, 0, 132, 1)",
                                        fill: "start",
                                        borderWidth: 0.5
                                    },
                                    {
                                        label: "Comment",
                                        backgroundColor: [
                                            "rgba(93, 13, 54, 0.8)"
                                        ],
                                        data: comment(),
                                        borderColor: "rgba(93, 13, 54, 0.8)",
                                        fill: "start",
                                        borderWidth: 0.5
                                    },
                                    {
                                        label: "User like tutorial",
                                        backgroundColor: [
                                            "rgba(0, 168, 255, 0.2)"
                                        ],
                                        data: userLiketoturial(),
                                        borderColor: "rgba(0, 168, 255, 1)",
                                        fill: "start",
                                        borderWidth: 0.5
                                    },
                                    {
                                        label: "Register user",
                                        backgroundColor: [
                                            "rgba(120, 255, 0, 0.2)"
                                        ],
                                        data: userRegister(),
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
                    <h3 className="text-center">Category of tutorial</h3>
                    <div className="col7__item">
                        <Line
                            data={{
                                labels: nameCate(),
                                datasets: [
                                    {
                                        label: "Number totoiral",
                                        backgroundColor: [
                                            "rgba(255, 0, 132, 0.1)"
                                        ],
                                        data: numberCateOftutorial(),
                                        borderColor: "rgba(255, 0, 132, 1)",
                                        fill: "start",
                                        borderWidth: 0.5
                                    },
                                    {
                                        label: "Number care category",
                                        backgroundColor: [
                                            "rgba(93, 13, 54, 0.1)"
                                        ],
                                        data: numberUserLikeCate(),
                                        borderColor: "rgba(0, 168, 255, 1)",
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
                        <h3 className="text-center">All Category</h3>
                        <Pie
                            data={{
                                labels: nameCate(),
                                datasets: [
                                    {
                                        label: "All post",
                                        backgroundColor: [
                                            'rgba(255, 0, 132, 0.2)',
                                            'rgba(93, 13, 54, 0.8)',
                                            'rgba(120, 255, 0, 0.2)',
                                            'rgba(0, 168, 255, 0.2)',
                                            'rgba(245, 121, 145, 0.8)',
                                            'rgba(50, 50, 69, 0.8)',
                                            'rgba(102, 145, 138, 0.8)',
                                            'rgba(131, 153, 149, 0.8)',
                                            'rgba(65, 114, 25, 0.8)',
                                            'rgba(104, 105, 12, 0.8)',
                                            'rgba(221, 223, 15, 0.8)',
                                        ],
                                        data: numberCateOftutorial(),


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
