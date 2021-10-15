import { ParsedQs } from 'qs';

export default class PathHelper {
    static includeParam(include: string) {
        return include.replace(' ', '').toLowerCase().trim()
    }
}