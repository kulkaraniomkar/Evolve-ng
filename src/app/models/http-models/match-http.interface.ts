import { IMatch, IMatchesCreate } from '../match.interface';
import { IManualMatch } from '../manual-match.interface';
import { IPage } from '../page.interface';

export interface IMatchesHttp {
    results: IMatch[];
    errors: any[];
    TotalItems: number;
    PageNumber: number;
    PageSize: number;
    PageCount: number;
    Error?: any;
    Registered: boolean;
}
export interface IMatchService {
    matches: IMatch[];
    error: string;
}


export interface IMatchesCreateHttp  extends IMatchesCreate{
  
}

export interface IMatchesCreateService extends IMatchesCreate {
    
}

export interface IManualMatchesHttp {
    data: IManualMatch[];
    totalItems: number;
    pageNumber: number;
    pageSize: number;
    Registered: boolean;
}
export interface IManualMatchesService {
    manualMenteeMatches: IManualMatch[];
    page: IPage
}



