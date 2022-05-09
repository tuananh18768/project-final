import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import { errorNotifi, successNotifi } from '../../utils/Notification/Notification'

function ActivationEmail() {
    const { activation_token } = useParams('')


    useEffect(() => {
        if (activation_token) {
            const activationEmails = async () => {
                try {
                    const res = await axios.post('/user/activation', { activation_token })
                    successNotifi(res.data.msg)
                } catch (err) {
                    err.response.data.msg && errorNotifi(err.response.data.msg)
                }
            }
            activationEmails()
        }
    }, [activation_token])
    console.log(useParams())
    return (
        <div>
        </div>
    )
}

export default ActivationEmail