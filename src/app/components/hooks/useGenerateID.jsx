const validateID = (list, id) => {
    return list.some(value => value.id === id);
}

const useGenerateID = (list) => {
    let id = Math.floor(Math.random() * 1000);

    while (validateID(list, id)) {
        id = Math.floor(Math.random() * 1000);
    }

    return id;
}

export default useGenerateID;