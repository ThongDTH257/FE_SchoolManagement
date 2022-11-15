import useTranslation from "next-translate/useTranslation"

function useFormatDate() {
    const { lang } = useTranslation("common")
    const dateFormat = lang === "en" ? "MM/DD/YYYY" : "DD/MM/YYYY"
    const datetimeFormat = lang === "en" ? 'MM/DD/yyyy hh:mm:ss' : 'DD/MM/yyyy hh:mm:ss'
    return { dateFormat, datetimeFormat }
}
interface props {
}
export default useFormatDate