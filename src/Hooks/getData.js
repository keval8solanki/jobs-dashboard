import React, { useEffect, useState } from 'react'
import axios from 'axios'

export const useGetData = (endpoint) => {
    useEffect(() => {
        axios.get(endpoint)
            .then(data => {
                return data
            })
            .catch(err => {
                return err
            })

    }, [])


}