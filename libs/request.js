import config from '../config'
import {token} from '../utils/token'

const send = (url, data, method = 'POST', showLoading = true, base_url = '') => {
    uni.showLoading({
        title: '加载中'
    })
    return new Promise((resolve) => {
        uni.request({
            method: method,
            url: (base_url ? base_url : config.apiUrl) + url,
            data: data,
            header: (() => {
                const tokeValue = token.get()
                let config = {}
                if (tokeValue) {
                    config[config.tokenKey] = tokeValue
                }
                return config
            })(),
            success: (res) => {
                uni.hideLoading()
                resolve(res.data)
            }
        })
    })
}

export const request = {
    get: (url, data) => {
        return send(url, data, 'GET')
    },
    post: (url, data) => {
        return send(url, data, 'POST')
    }
}