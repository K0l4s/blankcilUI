import axios from 'axios'
import React from 'react'
import { apiPath } from '../../endpoint';

export const sendCode = async (email) => {
    return await
        axios.patch(apiPath+`auth/code/${email}`);
}
