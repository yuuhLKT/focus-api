import { v4 as uuidv4 } from 'uuid';

const tempIdMap: Record<string, string> = {};

export const generateTempId = (realId: string) => {
    const tempId = uuidv4();
    tempIdMap[tempId] = realId;
    return tempId;
};

export const getRealId = (tempId: string) => {
    return tempIdMap[tempId];
};

export const deleteTempId = (tempId: string) => {
    delete tempIdMap[tempId];
};
