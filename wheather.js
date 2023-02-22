import { getArgs } from "./helpers/args.js"
import { getIcon, getWheather } from "./services/api.service.js"
import { printError, printHelp, printSuccess, printWeather } from "./services/log.service.js"
import { getKeyValue, saveKeyValue, TOKEN_DICTIONARY } from "./services/storage.service.js"

const getForcast = async () => {
    try {
        const city = process.env.CITY ?? await getKeyValue(TOKEN_DICTIONARY.city)
        const wheather = await getWheather(city)
        printWeather(wheather, getIcon(wheather?.weather[0]?.icon))
    } catch (e) {
        if (e?.response?.status === 401) {
            printError('Неверно указан токен!')
        } else if (e?.response?.status === 400) {
            printError('Неверно указан город!')
        } else {
            printError(e.message)
        }
    }
}

const saveCity = async (city) => {
    if (!city.length) {
        printError('Не передан город!')
        return;
    }
    try {
        await saveKeyValue(TOKEN_DICTIONARY.city, city)
        printSuccess('Город успешно сохранен!')
    } catch (e) {
        printError(e.message)
    }
}

const saveToken = async (token) => {
    if (!token.length) {
        printError('Не передан токен!')
        return;
    }
    try {
        await saveKeyValue(TOKEN_DICTIONARY.token, token)
        printSuccess('Токен успешно сохранен!')
    } catch (e) {
        printError(e.message)
    }
}

const initCLI = () => {
    const args = getArgs(process.argv)

    if (args.h) {
        return printHelp()
    }
    if (args.s) {
        return saveCity(args.s)
    }
    if (args.t) {
        return saveToken(args.t)
    }
    return getForcast()
}

initCLI()