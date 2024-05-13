// translator.js

export async function translate(source) {
    const sourceLanguage = "hi";
    const targetLanguage = "en";

    const url =
        "https://translate.googleapis.com/translate_a/single?client=gtx&sl=" +
        sourceLanguage +
        "&tl=" +
        targetLanguage +
        "&dt=t&q=" +
        encodeURI(source);

    const result = await fetch(url);
    const json = await result.json();

    try {
        return json[0][0][0];
    } catch (error) {
        return error.message;
    }
}


export async function translateCityAndState(data) {
    try {
        return await Promise.all(data.map(async (item) => {
            if (item.basic_profile && item.basic_profile.city && item.basic_profile.state) {
                const translatedCity = await translate(item.basic_profile.city);
                const translatedState = await translate(item.basic_profile.state);

                return {
                    ...item,
                    basic_profile: {
                        ...item.basic_profile,
                        city: translatedCity,
                        state: translatedState
                    }
                };
            } else {
                return item;
            }
        }));
    } catch (error) {
        console.error('Error translating city and state:', error);
        return data;
    }
}
