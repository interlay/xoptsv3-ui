import NextI18Next from "next-i18next";
import path from "path";

export const i18n = new NextI18Next({
    defaultLanguage: "en",
    otherLanguages: [],
    localePath: path.resolve("public/static/locales"),
});

export const appWithTranslation = i18n.appWithTranslation;
export const withTranslation = i18n.withTranslation;
