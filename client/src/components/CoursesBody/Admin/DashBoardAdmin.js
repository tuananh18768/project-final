import React, { useEffect } from 'react'
import { Chart as ChartJS, registerables } from 'chart.js';
import { Line, Bar, Doughnu, Pie, Radar } from 'react-chartjs-2'
import { useDispatch, useSelector } from 'react-redux'
import { fetchDashBoardAdmin, dispatchDashBoardAdmin } from '../../../redux/actions/dashboardAction'

ChartJS.register(...registerables);

export default function DashboardAdmin() {
    const dashboard = useSelector(state => state.dashboard)
    const token = useSelector(state => state.token)



    const { dashboardTrainer, dashboardAdmin } = dashboard
    const { tokenAdmin } = token
    const dispatch = useDispatch()

    useEffect(() => {
        if (tokenAdmin) {
            fetchDashBoardAdmin(tokenAdmin).then(res => dispatch(dispatchDashBoardAdmin(res)))
        }
    }, [tokenAdmin, dispatch])
    console.log(dashboardTrainer)

    const tutorialTrainer = () => {
        const numberTutorial = dashboardAdmin.dataTrainer?.map(element => element.tutorialTrainer.length)
        return numberTutorial
    }
    const nameUsers = () => {
        const nameOfUser = dashboardAdmin.dataLearn?.map(element => element.name)
        return nameOfUser
    }
    const nameTrainer = () => {
        const nameTrainers = dashboardAdmin.dataTrainer?.map(element => element.name)
        return nameTrainers
    }
    const nameTutorial = () => {
        const nameAlltutorial = dashboardAdmin.dataTutorial?.map(element => element.name)
        return nameAlltutorial
    }
    const commentTutorial = () => {
        const comment = dashboardAdmin.dataTutorial?.map(element => element.commnets?.length)
        return comment
    }
    const coursesTutorial = () => {
        const numberCourses = dashboardAdmin.dataTutorial?.map(element => element.courses?.length)
        return numberCourses
    }
    const nameCates = () => {
        const userLikeCourses = dashboardAdmin.dataCate?.map(element => element.name)
        return userLikeCourses
    }
    const totalTutorialOfCate = () => {
        const numbertutorials = dashboardAdmin.dataCate?.map(element => element.cateTutorial.length)
        return numbertutorials
    }
    const totalUserLearn = () => {
        const numberUserLearn = dashboardAdmin.dataLearn?.map(element => element.cateTutorial.length)
        return numberUserLearn
    }

    console.log(dashboardAdmin)
    return (
        <div className="db">
            <div className="db__row">
                <div className="db__col-4 mgr10">
                    <div className="dbbox">
                        <div>
                            <h4>Total Trainer</h4>
                            <p>Last year expenses</p>
                        </div>
                        <div className>
                            <span className="totalCourses">{dashboardAdmin.dataTrainer?.length}</span>
                        </div>
                    </div>
                </div>
                <div className="db__col-4 mgl10 mgr10">
                    <div className="dbbox">
                        <div>
                            <h4>Total User</h4>
                            <p>Last year expenses</p>
                        </div>
                        <div>
                            <span>{dashboardAdmin.dataLearn?.length}</span>
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
                            <span>{dashboardAdmin.dataCate?.length}</span>
                        </div>
                    </div>
                </div>
                <div className="db__col-4 mgl10">
                    <div className="dbbox">
                        <div>
                            <h4>Total Tutorial</h4>
                            <p>Last year expenses</p>
                        </div>
                        <div>
                            <span>{dashboardAdmin.dataTutorial?.length}</span>
                        </div>
                    </div>
                </div>

            </div>
            <div className="db__row">
                <div className="col6 mgr10">
                    <div className="dbitem">
                        <h3 className="text-center">All trainer</h3>
                        <Bar
                            data={{
                                labels: nameTrainer(),
                                datasets: [
                                    {
                                        label: "Tutorial of trainer",
                                        backgroundColor: [
                                            "rgba(255, 0, 132, 0.2)"
                                        ],
                                        data: tutorialTrainer(),
                                        borderColor: "rgba(255, 0, 132, 1)",
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
                </div>
                <div className="col7">
                    <h3 className="text-center">Category of tutorial</h3>
                    <div className="col7__item">
                        <Bar
                            data={{
                                labels: nameCates(),
                                datasets: [
                                    {
                                        label: "Tutorial of Category",
                                        backgroundColor: [
                                            "rgba(31, 175, 152, 0.3)"
                                        ],
                                        data: totalTutorialOfCate(),
                                        borderColor: "rgba(31, 175, 152, 1)",
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
                        <h3 className="text-center">All Trainee</h3>
                        <Bar
                            data={{
                                labels: nameUsers(),
                                datasets: [
                                    {
                                        label: "Tutorial user learn",
                                        backgroundColor: [
                                            "rgba(90, 122, 16, 0.3)"
                                        ],
                                        data: totalUserLearn(),
                                        borderColor: "rgba(90, 122, 16, 1)",
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
                        <h3 className="text-center">Parameters of the tutorial</h3>
                        <Bar
                            data={{
                                labels: nameTutorial(),
                                datasets: [
                                    {
                                        label: "Tutorial",
                                        backgroundColor: [
                                            "rgba(216, 197, 22, 0.3)"
                                        ],
                                        data: commentTutorial(),
                                        borderColor: "rgba(216, 197, 22, 1)",
                                        fill: "start",
                                        borderWidth: 0.5
                                    },
                                    {
                                        label: "Courses video",
                                        backgroundColor: [
                                            "rgba(33, 32, 162, 0.3)"
                                        ],
                                        data: coursesTutorial(),
                                        borderColor: "rgba(33, 32, 162, 1))",
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
