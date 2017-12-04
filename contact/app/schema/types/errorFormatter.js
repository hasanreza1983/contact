module.exports = {
    makeErrorArray: (errorObject) => {
        console.log(errorObject);
        let ErrArr = [];
        if (errorObject) {
            for (let i = 0; i < errorObject.length; i++) {
                let key = errorObject[i].message.split(/["]/)[1];
                ErrArr.push({ key: key, message: errorObject[i].message });
            }
        }
        return ErrArr;
    }
};