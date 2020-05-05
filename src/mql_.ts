import * as axios from 'axios';

export interface ClientOpts {
    client: axios.AxiosInstance;
    addr: string;
}

export class Client {
    opts: ClientOpts;

    constructor(opts: ClientOpts) {
        this.opts = opts;
    }
    
    async GetPostFeeds(req: GetPostFeedsRequest): Promise<GetPostFeedsResponse> {
        let rsp = await this.opts.client.request<GetPostFeedsResponse>({
            url: this.opts.addr,
            method: "post",
            data: req,
            headers: {
                "X-MetaMate-Type": "GetPostFeedsRequest",
                "Content-Type": "application/json; charset=utf-8",
            },
        });

        return rsp.data
    }
    
    async GetPosts(req: GetPostsRequest): Promise<GetPostsResponse> {
        let rsp = await this.opts.client.request<GetPostsResponse>({
            url: this.opts.addr,
            method: "post",
            data: req,
            headers: {
                "X-MetaMate-Type": "GetPostsRequest",
                "Content-Type": "application/json; charset=utf-8",
            },
        });

        return rsp.data
    }
    
    async GetSocialAccounts(req: GetSocialAccountsRequest): Promise<GetSocialAccountsResponse> {
        let rsp = await this.opts.client.request<GetSocialAccountsResponse>({
            url: this.opts.addr,
            method: "post",
            data: req,
            headers: {
                "X-MetaMate-Type": "GetSocialAccountsRequest",
                "Content-Type": "application/json; charset=utf-8",
            },
        });

        return rsp.data
    }
    
}

export const DurationUnit =  Object.freeze({
    D: "d",
    H: "h",
    M: "m",
    Ms: "ms",
    Ns: "ns",
    S: "s",
    W: "w",
    Y: "y",
});

export const ErrorKind =  Object.freeze({
    IdAlreadyPresent: "idAlreadyPresent",
    IdNotPresent: "idNotPresent",
    Internal: "internal",
    NoServiceMatch: "noServiceMatch",
    Pipe: "pipe",
    RequestValidation: "requestValidation",
    ResponseValidation: "responseValidation",
    Service: "service",
    Upstream: "upstream",
});

export const FormattingKind =  Object.freeze({
    Html: "html",
    Markdown: "markdown",
    Plain: "plain",
});

export const GetModeKind =  Object.freeze({
    Collection: "collection",
    Id: "id",
    Relation: "relation",
    Search: "search",
});

export const IdKind =  Object.freeze({
    Ean: "ean",
    Email: "email",
    Local: "local",
    Me: "me",
    Name: "name",
    ServiceId: "serviceId",
    Url: "url",
    Username: "username",
});

export const Language =  Object.freeze({
    En: "en",
});

export const LengthUnit =  Object.freeze({
    Cm: "cm",
    Dm: "dm",
    Ft: "ft",
    In: "in",
    Km: "km",
    Lea: "lea",
    M: "m",
    Mcm: "mcm",
    Mi: "mi",
    Mm: "mm",
    Nm: "nm",
    Th: "th",
    Yd: "yd",
});

export const PageKind =  Object.freeze({
    CursorPage: "cursorPage",
    IndexPage: "indexPage",
    OffsetPage: "offsetPage",
});

export const PostFeedKind =  Object.freeze({
    Channel: "channel",
    Conversation: "conversation",
    PrivateChannel: "privateChannel",
});

export const PostKind =  Object.freeze({
    Post: "post",
    Reply: "reply",
});

export const ServiceTransport =  Object.freeze({
    HttpJson: "httpJson",
});

export const SortKind =  Object.freeze({
    Asc: "asc",
    Desc: "desc",
});

export const TimestampKind =  Object.freeze({
    Unix: "unix",
});

export interface Attachment {
    alternativeIds?: Id[];
    createdAt?: Timestamp;
    description?: string;
    id?: ServiceId;
    relations?: AttachmentRelations;
}

export interface AttachmentFilter {
    alternativeIds?: IdListFilter;
    and?: AttachmentFilter[];
    createdAt?: TimestampFilter;
    description?: StringFilter;
    id?: ServiceIdFilter;
    not?: AttachmentFilter[];
    or?: AttachmentFilter[];
    set?: boolean;
}

export interface AttachmentListFilter {
    every?: AttachmentFilter;
    none?: AttachmentFilter;
    some?: AttachmentFilter;
}

export interface AttachmentRelations {
    attachedToPost?: Post;
}

export interface AttachmentRelationsSelect {
    all?: boolean;
    attachedToPost?: PostSelect;
}

export interface AttachmentsCollection {
    attachments?: Attachment[];
    count?: number;
    errors?: Error[];
    pagination?: Pagination;
}

export interface AttachmentsCollectionSelect {
    all?: boolean;
    attachments?: AttachmentSelect;
    count?: boolean;
    errors?: ErrorSelect;
    pagination?: PaginationSelect;
}

export interface AttachmentSelect {
    all?: boolean;
    alternativeIds?: IdSelect;
    createdAt?: TimestampSelect;
    description?: boolean;
    id?: ServiceIdSelect;
    relations?: AttachmentRelationsSelect;
}

export interface AttachmentSort {
    createdAt?: TimestampSort;
    description?: string;
    id?: ServiceIdSort;
}

export interface BlueWhateverFilter {
    alternativeIds?: IdListFilter;
    and?: BlueWhateverFilter[];
    boolField?: BoolFilter;
    boolList?: BoolListFilter;
    createdAt?: TimestampFilter;
    enumField?: EnumFilter;
    enumList?: EnumListFilter;
    float64Field?: Float64Filter;
    float64List?: Float64ListFilter;
    id?: ServiceIdFilter;
    int32Field?: Int32Filter;
    int32List?: Int32ListFilter;
    not?: BlueWhateverFilter[];
    or?: BlueWhateverFilter[];
    set?: boolean;
    stringField?: StringFilter;
    stringList?: StringListFilter;
    unionField?: WhateverUnionFilter;
    unionList?: WhateverUnionListFilter;
}

export interface BlueWhateverListFilter {
    every?: BlueWhateverFilter;
    none?: BlueWhateverFilter;
    some?: BlueWhateverFilter;
}

export interface BoolFilter {
    and?: BoolFilter[];
    is?: boolean;
    not?: boolean;
    or?: BoolFilter[];
    set?: boolean;
}

export interface BoolListFilter {
    and?: BoolFilter;
    not?: BoolFilter;
    or?: BoolFilter;
}

export interface CollectionGetMode {
    pages?: ServicePage[];
}

export interface CollectionGetModeFilter {
    and?: CollectionGetModeFilter[];
    not?: CollectionGetModeFilter[];
    or?: CollectionGetModeFilter[];
    pages?: ServicePageListFilter;
    set?: boolean;
}

export interface ContextPipeModeFilter {
    and?: ContextPipeModeFilter[];
    method?: EnumFilter;
    not?: ContextPipeModeFilter[];
    or?: ContextPipeModeFilter[];
    requester?: EnumFilter;
    set?: boolean;
    stage?: EnumFilter;
}

export interface CursorPage {
    value?: string;
}

export interface CursorPageFilter {
    and?: CursorPageFilter[];
    not?: CursorPageFilter[];
    or?: CursorPageFilter[];
    set?: boolean;
    value?: StringFilter;
}

export interface CursorPageSelect {
    all?: boolean;
    value?: boolean;
}

export interface DurationScalar {
    isEstimate?: boolean;
    unit?: string;
    value?: number;
}

export interface DurationScalarFilter {
    and?: DurationScalarFilter[];
    isEstimate?: BoolFilter;
    not?: DurationScalarFilter[];
    or?: DurationScalarFilter[];
    set?: boolean;
    unit?: EnumFilter;
    value?: Float64Filter;
}

export interface DurationScalarSelect {
    all?: boolean;
    isEstimate?: boolean;
    unit?: boolean;
    value?: boolean;
}

export interface DurationScalarSort {
    isEstimate?: string;
    value?: string;
}

export interface Email {
    value?: string;
}

export interface EmailFilter {
    and?: EmailFilter[];
    not?: EmailFilter[];
    or?: EmailFilter[];
    set?: boolean;
    value?: StringFilter;
}

export interface EmailSelect {
    all?: boolean;
    value?: boolean;
}

export interface Endpoints {
    getAttachments?: GetAttachmentsEndpoint;
    getBlueWhatevers?: GetBlueWhateversEndpoint;
    getPostFeeds?: GetPostFeedsEndpoint;
    getPosts?: GetPostsEndpoint;
    getServices?: GetServicesEndpoint;
    getSocialAccounts?: GetSocialAccountsEndpoint;
    getWhatevers?: GetWhateversEndpoint;
    lookupService?: LookupServiceEndpoint;
    pipeAttachments?: PipeAttachmentsEndpoint;
    pipeBlueWhatevers?: PipeBlueWhateversEndpoint;
    pipePostFeeds?: PipePostFeedsEndpoint;
    pipePosts?: PipePostsEndpoint;
    pipeServices?: PipeServicesEndpoint;
    pipeSocialAccounts?: PipeSocialAccountsEndpoint;
    pipeWhatevers?: PipeWhateversEndpoint;
}

export interface EndpointsFilter {
    and?: EndpointsFilter[];
    getAttachments?: GetAttachmentsEndpointFilter;
    getBlueWhatevers?: GetBlueWhateversEndpointFilter;
    getPostFeeds?: GetPostFeedsEndpointFilter;
    getPosts?: GetPostsEndpointFilter;
    getServices?: GetServicesEndpointFilter;
    getSocialAccounts?: GetSocialAccountsEndpointFilter;
    getWhatevers?: GetWhateversEndpointFilter;
    lookupService?: LookupServiceEndpointFilter;
    not?: EndpointsFilter[];
    or?: EndpointsFilter[];
    pipeAttachments?: PipeAttachmentsEndpointFilter;
    pipeBlueWhatevers?: PipeBlueWhateversEndpointFilter;
    pipePostFeeds?: PipePostFeedsEndpointFilter;
    pipePosts?: PipePostsEndpointFilter;
    pipeServices?: PipeServicesEndpointFilter;
    pipeSocialAccounts?: PipeSocialAccountsEndpointFilter;
    pipeWhatevers?: PipeWhateversEndpointFilter;
    set?: boolean;
}

export interface EnumFilter {
    and?: EnumFilter[];
    in?: string[];
    is?: string;
    not?: string;
    notIn?: string[];
    or?: EnumFilter[];
    set?: boolean;
}

export interface EnumListFilter {
    and?: EnumFilter;
    not?: EnumFilter;
    or?: EnumFilter;
}

export interface Error {
    id?: Id;
    kind?: string;
    message?: string;
    service?: Service;
    wraps?: Error;
}

export interface ErrorFilter {
    and?: ErrorFilter[];
    id?: IdFilter;
    kind?: EnumFilter;
    message?: StringFilter;
    not?: ErrorFilter[];
    or?: ErrorFilter[];
    service?: ServiceFilter;
    set?: boolean;
    wraps?: ErrorFilter;
}

export interface ErrorListFilter {
    every?: ErrorFilter;
    none?: ErrorFilter;
    some?: ErrorFilter;
}

export interface ErrorSelect {
    all?: boolean;
    id?: IdSelect;
    kind?: boolean;
    message?: boolean;
    service?: ServiceSelect;
    wraps?: ErrorSelect;
}

export interface Float64Filter {
    and?: Float64Filter[];
    gt?: number;
    gte?: number;
    in?: number[];
    is?: number;
    lt?: number;
    lte?: number;
    not?: number;
    notIn?: number[];
    or?: Float64Filter[];
    set?: boolean;
}

export interface Float64ListFilter {
    and?: Float64Filter;
    not?: Float64Filter;
    or?: Float64Filter;
}

export interface GetAttachmentsCollection {
    filter?: AttachmentFilter;
    pages?: ServicePage[];
    relations?: GetAttachmentsRelations;
    select?: AttachmentsCollectionSelect;
    serviceFilter?: ServiceFilter;
    sort?: AttachmentSort;
}

export interface GetAttachmentsEndpoint {
    filter?: GetAttachmentsRequestFilter;
}

export interface GetAttachmentsEndpointFilter {
    and?: GetAttachmentsEndpointFilter[];
    not?: GetAttachmentsEndpointFilter[];
    or?: GetAttachmentsEndpointFilter[];
    set?: boolean;
}

export interface GetAttachmentsRelations {
    attachedToPosts?: GetPostsCollection;
}

export interface GetAttachmentsRequestFilter {
    and?: GetAttachmentsRequestFilter[];
    meta?: RequestMetaFilter;
    mode?: GetModeFilter;
    not?: GetAttachmentsRequestFilter[];
    or?: GetAttachmentsRequestFilter[];
    pages?: ServicePageListFilter;
    set?: boolean;
}

export interface GetAttachmentsResponseFilter {
    and?: GetAttachmentsResponseFilter[];
    attachments?: AttachmentListFilter;
    count?: Int32Filter;
    errors?: ErrorListFilter;
    not?: GetAttachmentsResponseFilter[];
    or?: GetAttachmentsResponseFilter[];
    pagination?: PaginationFilter;
    set?: boolean;
}

export interface GetBlueWhateversEndpoint {
    filter?: GetBlueWhateversRequestFilter;
}

export interface GetBlueWhateversEndpointFilter {
    and?: GetBlueWhateversEndpointFilter[];
    not?: GetBlueWhateversEndpointFilter[];
    or?: GetBlueWhateversEndpointFilter[];
    set?: boolean;
}

export interface GetBlueWhateversRequestFilter {
    and?: GetBlueWhateversRequestFilter[];
    meta?: RequestMetaFilter;
    mode?: GetModeFilter;
    not?: GetBlueWhateversRequestFilter[];
    or?: GetBlueWhateversRequestFilter[];
    pages?: ServicePageListFilter;
    set?: boolean;
}

export interface GetBlueWhateversResponseFilter {
    and?: GetBlueWhateversResponseFilter[];
    blueWhatevers?: BlueWhateverListFilter;
    count?: Int32Filter;
    errors?: ErrorListFilter;
    not?: GetBlueWhateversResponseFilter[];
    or?: GetBlueWhateversResponseFilter[];
    pagination?: PaginationFilter;
    set?: boolean;
}

export interface GetMode {
    collection?: CollectionGetMode;
    id?: Id;
    kind?: string;
    relation?: RelationGetMode;
    search?: SearchGetMode;
}

export interface GetModeFilter {
    and?: GetModeFilter[];
    collection?: CollectionGetModeFilter;
    id?: IdFilter;
    kind?: EnumFilter;
    not?: GetModeFilter[];
    or?: GetModeFilter[];
    relation?: RelationGetModeFilter;
    search?: SearchGetModeFilter;
    set?: boolean;
}

export interface GetPostFeedsCollection {
    filter?: PostFeedFilter;
    pages?: ServicePage[];
    relations?: GetPostFeedsRelations;
    select?: PostFeedsCollectionSelect;
    serviceFilter?: ServiceFilter;
    sort?: PostFeedSort;
}

export interface GetPostFeedsEndpoint {
    filter?: GetPostFeedsRequestFilter;
}

export interface GetPostFeedsEndpointFilter {
    and?: GetPostFeedsEndpointFilter[];
    not?: GetPostFeedsEndpointFilter[];
    or?: GetPostFeedsEndpointFilter[];
    set?: boolean;
}

export interface GetPostFeedsRelations {
    containsPosts?: GetPostsCollection;
    participatedBySocialAccounts?: GetSocialAccountsCollection;
}

export interface GetPostFeedsRequest {
    filter?: PostFeedFilter;
    meta?: RequestMeta;
    mode?: GetMode;
    pages?: ServicePage[];
    relations?: GetPostFeedsRelations;
    select?: GetPostFeedsResponseSelect;
    serviceFilter?: ServiceFilter;
    sort?: PostFeedSort;
}

export interface GetPostFeedsRequestFilter {
    and?: GetPostFeedsRequestFilter[];
    meta?: RequestMetaFilter;
    mode?: GetModeFilter;
    not?: GetPostFeedsRequestFilter[];
    or?: GetPostFeedsRequestFilter[];
    pages?: ServicePageListFilter;
    set?: boolean;
}

export interface GetPostFeedsResponse {
    count?: number;
    errors?: Error[];
    pagination?: Pagination;
    postFeeds?: PostFeed[];
}

export interface GetPostFeedsResponseFilter {
    and?: GetPostFeedsResponseFilter[];
    count?: Int32Filter;
    errors?: ErrorListFilter;
    not?: GetPostFeedsResponseFilter[];
    or?: GetPostFeedsResponseFilter[];
    pagination?: PaginationFilter;
    postFeeds?: PostFeedListFilter;
    set?: boolean;
}

export interface GetPostFeedsResponseSelect {
    all?: boolean;
    count?: boolean;
    errors?: ErrorSelect;
    pagination?: PaginationSelect;
    postFeeds?: PostFeedSelect;
}

export interface GetPostsCollection {
    filter?: PostFilter;
    pages?: ServicePage[];
    relations?: GetPostsRelations;
    select?: PostsCollectionSelect;
    serviceFilter?: ServiceFilter;
    sort?: PostSort;
}

export interface GetPostsEndpoint {
    filter?: GetPostsRequestFilter;
}

export interface GetPostsEndpointFilter {
    and?: GetPostsEndpointFilter[];
    not?: GetPostsEndpointFilter[];
    or?: GetPostsEndpointFilter[];
    set?: boolean;
}

export interface GetPostsRelations {
    attachesAttachments?: GetAttachmentsCollection;
    authoredBySocialAccounts?: GetSocialAccountsCollection;
    bookmarkedBySocialAccounts?: GetSocialAccountsCollection;
    containedByPostFeeds?: GetPostFeedsCollection;
    favoredBySocialAccounts?: GetSocialAccountsCollection;
    mentionsSocialAccounts?: GetSocialAccountsCollection;
    mutedBySocialAccounts?: GetSocialAccountsCollection;
    notReadBySocialAccounts?: GetSocialAccountsCollection;
    readBySocialAccounts?: GetSocialAccountsCollection;
    rebloggedByPosts?: GetPostsCollection;
    rebloggedBySocialAccounts?: GetSocialAccountsCollection;
    reblogsPosts?: GetPostsCollection;
    repliesToPosts?: GetPostsCollection;
    repliesToSocialAccounts?: GetSocialAccountsCollection;
    wasRepliedToByPosts?: GetPostsCollection;
}

export interface GetPostsRequest {
    filter?: PostFilter;
    meta?: RequestMeta;
    mode?: GetMode;
    pages?: ServicePage[];
    relations?: GetPostsRelations;
    select?: GetPostsResponseSelect;
    serviceFilter?: ServiceFilter;
    sort?: PostSort;
}

export interface GetPostsRequestFilter {
    and?: GetPostsRequestFilter[];
    meta?: RequestMetaFilter;
    mode?: GetModeFilter;
    not?: GetPostsRequestFilter[];
    or?: GetPostsRequestFilter[];
    pages?: ServicePageListFilter;
    set?: boolean;
}

export interface GetPostsResponse {
    count?: number;
    errors?: Error[];
    pagination?: Pagination;
    posts?: Post[];
}

export interface GetPostsResponseFilter {
    and?: GetPostsResponseFilter[];
    count?: Int32Filter;
    errors?: ErrorListFilter;
    not?: GetPostsResponseFilter[];
    or?: GetPostsResponseFilter[];
    pagination?: PaginationFilter;
    posts?: PostListFilter;
    set?: boolean;
}

export interface GetPostsResponseSelect {
    all?: boolean;
    count?: boolean;
    errors?: ErrorSelect;
    pagination?: PaginationSelect;
    posts?: PostSelect;
}

export interface GetServicesEndpoint {
    filter?: GetServicesRequestFilter;
}

export interface GetServicesEndpointFilter {
    and?: GetServicesEndpointFilter[];
    not?: GetServicesEndpointFilter[];
    or?: GetServicesEndpointFilter[];
    set?: boolean;
}

export interface GetServicesRequestFilter {
    and?: GetServicesRequestFilter[];
    meta?: RequestMetaFilter;
    mode?: GetModeFilter;
    not?: GetServicesRequestFilter[];
    or?: GetServicesRequestFilter[];
    pages?: ServicePageListFilter;
    set?: boolean;
}

export interface GetServicesResponseFilter {
    and?: GetServicesResponseFilter[];
    count?: Int32Filter;
    errors?: ErrorListFilter;
    not?: GetServicesResponseFilter[];
    or?: GetServicesResponseFilter[];
    pagination?: PaginationFilter;
    services?: ServiceListFilter;
    set?: boolean;
}

export interface GetSocialAccountsCollection {
    filter?: SocialAccountFilter;
    pages?: ServicePage[];
    relations?: GetSocialAccountsRelations;
    select?: SocialAccountsCollectionSelect;
    serviceFilter?: ServiceFilter;
    sort?: SocialAccountSort;
}

export interface GetSocialAccountsEndpoint {
    filter?: GetSocialAccountsRequestFilter;
}

export interface GetSocialAccountsEndpointFilter {
    and?: GetSocialAccountsEndpointFilter[];
    not?: GetSocialAccountsEndpointFilter[];
    or?: GetSocialAccountsEndpointFilter[];
    set?: boolean;
}

export interface GetSocialAccountsRelations {
    authorsPosts?: GetPostsCollection;
    blockedBySocialAccounts?: GetSocialAccountsCollection;
    blocksSocialAccounts?: GetSocialAccountsCollection;
    bookmarksPosts?: GetPostsCollection;
    favorsPosts?: GetPostsCollection;
    followedBySocialAccounts?: GetSocialAccountsCollection;
    followsSocialAccounts?: GetSocialAccountsCollection;
    mentionedByPosts?: GetPostsCollection;
    mutedBySocialAccounts?: GetSocialAccountsCollection;
    mutesPosts?: GetPostsCollection;
    mutesSocialAccounts?: GetSocialAccountsCollection;
    notReadPosts?: GetPostsCollection;
    participatesPostFeeds?: GetPostFeedsCollection;
    readPosts?: GetPostsCollection;
    reblogsPosts?: GetPostsCollection;
    requestedToBeFollowedBySocialAccounts?: GetSocialAccountsCollection;
    requestsToFollowSocialAccounts?: GetSocialAccountsCollection;
    wasRepliedToByPosts?: GetPostsCollection;
}

export interface GetSocialAccountsRequest {
    filter?: SocialAccountFilter;
    meta?: RequestMeta;
    mode?: GetMode;
    pages?: ServicePage[];
    relations?: GetSocialAccountsRelations;
    select?: GetSocialAccountsResponseSelect;
    serviceFilter?: ServiceFilter;
    sort?: SocialAccountSort;
}

export interface GetSocialAccountsRequestFilter {
    and?: GetSocialAccountsRequestFilter[];
    meta?: RequestMetaFilter;
    mode?: GetModeFilter;
    not?: GetSocialAccountsRequestFilter[];
    or?: GetSocialAccountsRequestFilter[];
    pages?: ServicePageListFilter;
    set?: boolean;
}

export interface GetSocialAccountsResponse {
    count?: number;
    errors?: Error[];
    pagination?: Pagination;
    socialAccounts?: SocialAccount[];
}

export interface GetSocialAccountsResponseFilter {
    and?: GetSocialAccountsResponseFilter[];
    count?: Int32Filter;
    errors?: ErrorListFilter;
    not?: GetSocialAccountsResponseFilter[];
    or?: GetSocialAccountsResponseFilter[];
    pagination?: PaginationFilter;
    set?: boolean;
    socialAccounts?: SocialAccountListFilter;
}

export interface GetSocialAccountsResponseSelect {
    all?: boolean;
    count?: boolean;
    errors?: ErrorSelect;
    pagination?: PaginationSelect;
    socialAccounts?: SocialAccountSelect;
}

export interface GetWhateversEndpoint {
    filter?: GetWhateversRequestFilter;
}

export interface GetWhateversEndpointFilter {
    and?: GetWhateversEndpointFilter[];
    not?: GetWhateversEndpointFilter[];
    or?: GetWhateversEndpointFilter[];
    set?: boolean;
}

export interface GetWhateversRequestFilter {
    and?: GetWhateversRequestFilter[];
    meta?: RequestMetaFilter;
    mode?: GetModeFilter;
    not?: GetWhateversRequestFilter[];
    or?: GetWhateversRequestFilter[];
    pages?: ServicePageListFilter;
    set?: boolean;
}

export interface GetWhateversResponseFilter {
    and?: GetWhateversResponseFilter[];
    count?: Int32Filter;
    errors?: ErrorListFilter;
    not?: GetWhateversResponseFilter[];
    or?: GetWhateversResponseFilter[];
    pagination?: PaginationFilter;
    set?: boolean;
    whatevers?: WhateverListFilter;
}

export interface HyperLink {
    label?: string;
    url?: Url;
}

export interface HyperLinkFilter {
    and?: HyperLinkFilter[];
    label?: StringFilter;
    not?: HyperLinkFilter[];
    or?: HyperLinkFilter[];
    set?: boolean;
    url?: UrlFilter;
}

export interface HyperLinkListFilter {
    every?: HyperLinkFilter;
    none?: HyperLinkFilter;
    some?: HyperLinkFilter;
}

export interface HyperLinkSelect {
    all?: boolean;
    label?: boolean;
    url?: UrlSelect;
}

export interface Id {
    ean?: string;
    email?: Email;
    kind?: string;
    local?: string;
    me?: boolean;
    name?: string;
    serviceId?: ServiceId;
    url?: Url;
    username?: string;
}

export interface IdFilter {
    and?: IdFilter[];
    ean?: StringFilter;
    email?: EmailFilter;
    kind?: EnumFilter;
    local?: StringFilter;
    me?: BoolFilter;
    name?: StringFilter;
    not?: IdFilter[];
    or?: IdFilter[];
    serviceId?: ServiceIdFilter;
    set?: boolean;
    url?: UrlFilter;
    username?: StringFilter;
}

export interface IdListFilter {
    every?: IdFilter;
    none?: IdFilter;
    some?: IdFilter;
}

export interface IdSelect {
    all?: boolean;
    ean?: boolean;
    email?: EmailSelect;
    kind?: boolean;
    local?: boolean;
    me?: boolean;
    name?: boolean;
    serviceId?: ServiceIdSelect;
    url?: UrlSelect;
    username?: boolean;
}

export interface Image {
    description?: Text;
    height?: number;
    isPreview?: boolean;
    url?: Url;
    width?: number;
}

export interface ImageFilter {
    and?: ImageFilter[];
    description?: TextFilter;
    height?: Int32Filter;
    isPreview?: BoolFilter;
    not?: ImageFilter[];
    or?: ImageFilter[];
    set?: boolean;
    url?: UrlFilter;
    width?: Int32Filter;
}

export interface ImageSelect {
    all?: boolean;
    description?: TextSelect;
    height?: boolean;
    isPreview?: boolean;
    url?: UrlSelect;
    width?: boolean;
}

export interface ImageSort {
    description?: TextSort;
    height?: string;
    isPreview?: string;
    url?: UrlSort;
    width?: string;
}

export interface IndexPage {
    value?: number;
}

export interface IndexPageFilter {
    and?: IndexPageFilter[];
    not?: IndexPageFilter[];
    or?: IndexPageFilter[];
    set?: boolean;
    value?: Int32Filter;
}

export interface IndexPageSelect {
    all?: boolean;
    value?: boolean;
}

export interface Info {
    description?: Text;
    name?: Text;
    purpose?: Text;
}

export interface InfoFilter {
    and?: InfoFilter[];
    description?: TextFilter;
    name?: TextFilter;
    not?: InfoFilter[];
    or?: InfoFilter[];
    purpose?: TextFilter;
    set?: boolean;
}

export interface InfoSelect {
    all?: boolean;
    description?: TextSelect;
    name?: TextSelect;
    purpose?: TextSelect;
}

export interface InfoSort {
    description?: TextSort;
    name?: TextSort;
    purpose?: TextSort;
}

export interface Int32Filter {
    and?: Int32Filter[];
    gt?: number;
    gte?: number;
    in?: number[];
    is?: number;
    lt?: number;
    lte?: number;
    not?: number;
    notIn?: number[];
    or?: Int32Filter[];
    set?: boolean;
}

export interface Int32ListFilter {
    and?: Int32Filter;
    not?: Int32Filter;
    or?: Int32Filter;
}

export interface LengthScalar {
    isEstimate?: boolean;
    unit?: string;
    value?: number;
}

export interface LengthScalarFilter {
    and?: LengthScalarFilter[];
    isEstimate?: BoolFilter;
    not?: LengthScalarFilter[];
    or?: LengthScalarFilter[];
    set?: boolean;
    unit?: EnumFilter;
    value?: Float64Filter;
}

export interface LocationQuery {
    city?: string;
    cityDistrict?: string;
    country?: string;
    countryState?: string;
    countryStateDistrict?: string;
    radiusLt?: LengthScalar;
    street?: string;
    zipCode?: string;
}

export interface LocationQueryFilter {
    and?: LocationQueryFilter[];
    city?: StringFilter;
    cityDistrict?: StringFilter;
    country?: StringFilter;
    countryState?: StringFilter;
    countryStateDistrict?: StringFilter;
    not?: LocationQueryFilter[];
    or?: LocationQueryFilter[];
    radiusLt?: LengthScalarFilter;
    set?: boolean;
    street?: StringFilter;
    zipCode?: StringFilter;
}

export interface LookupServiceEndpoint {
    filter?: LookupServiceRequestFilter;
}

export interface LookupServiceEndpointFilter {
    and?: LookupServiceEndpointFilter[];
    not?: LookupServiceEndpointFilter[];
    or?: LookupServiceEndpointFilter[];
    set?: boolean;
}

export interface LookupServiceRequestFilter {
    and?: LookupServiceRequestFilter[];
    meta?: RequestMetaFilter;
    not?: LookupServiceRequestFilter[];
    or?: LookupServiceRequestFilter[];
    set?: boolean;
}

export interface OffsetPage {
    limit?: number;
    offset?: number;
}

export interface OffsetPageFilter {
    and?: OffsetPageFilter[];
    limit?: Int32Filter;
    not?: OffsetPageFilter[];
    offset?: Int32Filter;
    or?: OffsetPageFilter[];
    set?: boolean;
}

export interface OffsetPageSelect {
    all?: boolean;
    limit?: boolean;
    offset?: boolean;
}

export interface Page {
    cursorPage?: CursorPage;
    indexPage?: IndexPage;
    kind?: string;
    offsetPage?: OffsetPage;
}

export interface PageFilter {
    and?: PageFilter[];
    cursorPage?: CursorPageFilter;
    indexPage?: IndexPageFilter;
    kind?: EnumFilter;
    not?: PageFilter[];
    offsetPage?: OffsetPageFilter;
    or?: PageFilter[];
    set?: boolean;
}

export interface PageSelect {
    all?: boolean;
    cursorPage?: CursorPageSelect;
    indexPage?: IndexPageSelect;
    kind?: boolean;
    offsetPage?: OffsetPageSelect;
}

export interface Pagination {
    current?: ServicePage[];
    next?: ServicePage[];
    previous?: ServicePage[];
}

export interface PaginationFilter {
    and?: PaginationFilter[];
    current?: ServicePageListFilter;
    next?: ServicePageListFilter;
    not?: PaginationFilter[];
    or?: PaginationFilter[];
    previous?: ServicePageListFilter;
    set?: boolean;
}

export interface PaginationSelect {
    all?: boolean;
    current?: ServicePageSelect;
    next?: ServicePageSelect;
    previous?: ServicePageSelect;
}

export interface PipeAttachmentsContextFilter {
    and?: PipeAttachmentsContextFilter[];
    get?: PipeGetAttachmentsContextFilter;
    not?: PipeAttachmentsContextFilter[];
    or?: PipeAttachmentsContextFilter[];
    set?: boolean;
}

export interface PipeAttachmentsEndpoint {
    filter?: PipeAttachmentsRequestFilter;
}

export interface PipeAttachmentsEndpointFilter {
    and?: PipeAttachmentsEndpointFilter[];
    not?: PipeAttachmentsEndpointFilter[];
    or?: PipeAttachmentsEndpointFilter[];
    set?: boolean;
}

export interface PipeAttachmentsRequestFilter {
    and?: PipeAttachmentsRequestFilter[];
    context?: PipeAttachmentsContextFilter;
    meta?: RequestMetaFilter;
    mode?: PipeModeFilter;
    not?: PipeAttachmentsRequestFilter[];
    or?: PipeAttachmentsRequestFilter[];
    set?: boolean;
}

export interface PipeBlueWhateversContextFilter {
    and?: PipeBlueWhateversContextFilter[];
    get?: PipeGetBlueWhateversContextFilter;
    not?: PipeBlueWhateversContextFilter[];
    or?: PipeBlueWhateversContextFilter[];
    set?: boolean;
}

export interface PipeBlueWhateversEndpoint {
    filter?: PipeBlueWhateversRequestFilter;
}

export interface PipeBlueWhateversEndpointFilter {
    and?: PipeBlueWhateversEndpointFilter[];
    not?: PipeBlueWhateversEndpointFilter[];
    or?: PipeBlueWhateversEndpointFilter[];
    set?: boolean;
}

export interface PipeBlueWhateversRequestFilter {
    and?: PipeBlueWhateversRequestFilter[];
    context?: PipeBlueWhateversContextFilter;
    meta?: RequestMetaFilter;
    mode?: PipeModeFilter;
    not?: PipeBlueWhateversRequestFilter[];
    or?: PipeBlueWhateversRequestFilter[];
    set?: boolean;
}

export interface PipeGetAttachmentsContextFilter {
    and?: PipeGetAttachmentsContextFilter[];
    clientRequest?: GetAttachmentsRequestFilter;
    clientResponse?: GetAttachmentsResponseFilter;
    not?: PipeGetAttachmentsContextFilter[];
    or?: PipeGetAttachmentsContextFilter[];
    serviceRequest?: GetAttachmentsRequestFilter;
    serviceResponse?: GetAttachmentsResponseFilter;
    set?: boolean;
}

export interface PipeGetBlueWhateversContextFilter {
    and?: PipeGetBlueWhateversContextFilter[];
    clientRequest?: GetBlueWhateversRequestFilter;
    clientResponse?: GetBlueWhateversResponseFilter;
    not?: PipeGetBlueWhateversContextFilter[];
    or?: PipeGetBlueWhateversContextFilter[];
    serviceRequest?: GetBlueWhateversRequestFilter;
    serviceResponse?: GetBlueWhateversResponseFilter;
    set?: boolean;
}

export interface PipeGetPostFeedsContextFilter {
    and?: PipeGetPostFeedsContextFilter[];
    clientRequest?: GetPostFeedsRequestFilter;
    clientResponse?: GetPostFeedsResponseFilter;
    not?: PipeGetPostFeedsContextFilter[];
    or?: PipeGetPostFeedsContextFilter[];
    serviceRequest?: GetPostFeedsRequestFilter;
    serviceResponse?: GetPostFeedsResponseFilter;
    set?: boolean;
}

export interface PipeGetPostsContextFilter {
    and?: PipeGetPostsContextFilter[];
    clientRequest?: GetPostsRequestFilter;
    clientResponse?: GetPostsResponseFilter;
    not?: PipeGetPostsContextFilter[];
    or?: PipeGetPostsContextFilter[];
    serviceRequest?: GetPostsRequestFilter;
    serviceResponse?: GetPostsResponseFilter;
    set?: boolean;
}

export interface PipeGetServicesContextFilter {
    and?: PipeGetServicesContextFilter[];
    clientRequest?: GetServicesRequestFilter;
    clientResponse?: GetServicesResponseFilter;
    not?: PipeGetServicesContextFilter[];
    or?: PipeGetServicesContextFilter[];
    serviceRequest?: GetServicesRequestFilter;
    serviceResponse?: GetServicesResponseFilter;
    set?: boolean;
}

export interface PipeGetSocialAccountsContextFilter {
    and?: PipeGetSocialAccountsContextFilter[];
    clientRequest?: GetSocialAccountsRequestFilter;
    clientResponse?: GetSocialAccountsResponseFilter;
    not?: PipeGetSocialAccountsContextFilter[];
    or?: PipeGetSocialAccountsContextFilter[];
    serviceRequest?: GetSocialAccountsRequestFilter;
    serviceResponse?: GetSocialAccountsResponseFilter;
    set?: boolean;
}

export interface PipeGetWhateversContextFilter {
    and?: PipeGetWhateversContextFilter[];
    clientRequest?: GetWhateversRequestFilter;
    clientResponse?: GetWhateversResponseFilter;
    not?: PipeGetWhateversContextFilter[];
    or?: PipeGetWhateversContextFilter[];
    serviceRequest?: GetWhateversRequestFilter;
    serviceResponse?: GetWhateversResponseFilter;
    set?: boolean;
}

export interface PipeModeFilter {
    and?: PipeModeFilter[];
    context?: ContextPipeModeFilter;
    kind?: EnumFilter;
    not?: PipeModeFilter[];
    or?: PipeModeFilter[];
    set?: boolean;
}

export interface PipePostFeedsContextFilter {
    and?: PipePostFeedsContextFilter[];
    get?: PipeGetPostFeedsContextFilter;
    not?: PipePostFeedsContextFilter[];
    or?: PipePostFeedsContextFilter[];
    set?: boolean;
}

export interface PipePostFeedsEndpoint {
    filter?: PipePostFeedsRequestFilter;
}

export interface PipePostFeedsEndpointFilter {
    and?: PipePostFeedsEndpointFilter[];
    not?: PipePostFeedsEndpointFilter[];
    or?: PipePostFeedsEndpointFilter[];
    set?: boolean;
}

export interface PipePostFeedsRequestFilter {
    and?: PipePostFeedsRequestFilter[];
    context?: PipePostFeedsContextFilter;
    meta?: RequestMetaFilter;
    mode?: PipeModeFilter;
    not?: PipePostFeedsRequestFilter[];
    or?: PipePostFeedsRequestFilter[];
    set?: boolean;
}

export interface PipePostsContextFilter {
    and?: PipePostsContextFilter[];
    get?: PipeGetPostsContextFilter;
    not?: PipePostsContextFilter[];
    or?: PipePostsContextFilter[];
    set?: boolean;
}

export interface PipePostsEndpoint {
    filter?: PipePostsRequestFilter;
}

export interface PipePostsEndpointFilter {
    and?: PipePostsEndpointFilter[];
    not?: PipePostsEndpointFilter[];
    or?: PipePostsEndpointFilter[];
    set?: boolean;
}

export interface PipePostsRequestFilter {
    and?: PipePostsRequestFilter[];
    context?: PipePostsContextFilter;
    meta?: RequestMetaFilter;
    mode?: PipeModeFilter;
    not?: PipePostsRequestFilter[];
    or?: PipePostsRequestFilter[];
    set?: boolean;
}

export interface PipeServicesContextFilter {
    and?: PipeServicesContextFilter[];
    get?: PipeGetServicesContextFilter;
    not?: PipeServicesContextFilter[];
    or?: PipeServicesContextFilter[];
    set?: boolean;
}

export interface PipeServicesEndpoint {
    filter?: PipeServicesRequestFilter;
}

export interface PipeServicesEndpointFilter {
    and?: PipeServicesEndpointFilter[];
    not?: PipeServicesEndpointFilter[];
    or?: PipeServicesEndpointFilter[];
    set?: boolean;
}

export interface PipeServicesRequestFilter {
    and?: PipeServicesRequestFilter[];
    context?: PipeServicesContextFilter;
    meta?: RequestMetaFilter;
    mode?: PipeModeFilter;
    not?: PipeServicesRequestFilter[];
    or?: PipeServicesRequestFilter[];
    set?: boolean;
}

export interface PipeSocialAccountsContextFilter {
    and?: PipeSocialAccountsContextFilter[];
    get?: PipeGetSocialAccountsContextFilter;
    not?: PipeSocialAccountsContextFilter[];
    or?: PipeSocialAccountsContextFilter[];
    set?: boolean;
}

export interface PipeSocialAccountsEndpoint {
    filter?: PipeSocialAccountsRequestFilter;
}

export interface PipeSocialAccountsEndpointFilter {
    and?: PipeSocialAccountsEndpointFilter[];
    not?: PipeSocialAccountsEndpointFilter[];
    or?: PipeSocialAccountsEndpointFilter[];
    set?: boolean;
}

export interface PipeSocialAccountsRequestFilter {
    and?: PipeSocialAccountsRequestFilter[];
    context?: PipeSocialAccountsContextFilter;
    meta?: RequestMetaFilter;
    mode?: PipeModeFilter;
    not?: PipeSocialAccountsRequestFilter[];
    or?: PipeSocialAccountsRequestFilter[];
    set?: boolean;
}

export interface PipeWhateversContextFilter {
    and?: PipeWhateversContextFilter[];
    get?: PipeGetWhateversContextFilter;
    not?: PipeWhateversContextFilter[];
    or?: PipeWhateversContextFilter[];
    set?: boolean;
}

export interface PipeWhateversEndpoint {
    filter?: PipeWhateversRequestFilter;
}

export interface PipeWhateversEndpointFilter {
    and?: PipeWhateversEndpointFilter[];
    not?: PipeWhateversEndpointFilter[];
    or?: PipeWhateversEndpointFilter[];
    set?: boolean;
}

export interface PipeWhateversRequestFilter {
    and?: PipeWhateversRequestFilter[];
    context?: PipeWhateversContextFilter;
    meta?: RequestMetaFilter;
    mode?: PipeModeFilter;
    not?: PipeWhateversRequestFilter[];
    or?: PipeWhateversRequestFilter[];
    set?: boolean;
}

export interface Post {
    alternativeIds?: Id[];
    content?: Text;
    createdAt?: Timestamp;
    id?: ServiceId;
    isPinned?: boolean;
    isSensitive?: boolean;
    kind?: string;
    links?: HyperLink[];
    relations?: PostRelations;
    relationships?: PostRelationships;
    spoilerText?: Text;
    title?: Text;
    totalWasRepliedToByPostsCount?: number;
}

export interface PostFeed {
    alternativeIds?: Id[];
    createdAt?: Timestamp;
    id?: ServiceId;
    info?: Info;
    kind?: string;
    relations?: PostFeedRelations;
    relationships?: PostFeedRelationships;
}

export interface PostFeedFilter {
    alternativeIds?: IdListFilter;
    and?: PostFeedFilter[];
    createdAt?: TimestampFilter;
    id?: ServiceIdFilter;
    info?: InfoFilter;
    kind?: EnumFilter;
    not?: PostFeedFilter[];
    or?: PostFeedFilter[];
    set?: boolean;
}

export interface PostFeedListFilter {
    every?: PostFeedFilter;
    none?: PostFeedFilter;
    some?: PostFeedFilter;
}

export interface PostFeedRelations {
    containsPosts?: PostsCollection;
    participatedBySocialAccounts?: SocialAccountsCollection;
}

export interface PostFeedRelationships {
    participatedByMe?: boolean;
}

export interface PostFeedRelationshipsSelect {
    all?: boolean;
    participatedByMe?: boolean;
}

export interface PostFeedRelationsSelect {
    all?: boolean;
    containsPosts?: PostsCollectionSelect;
    participatedBySocialAccounts?: SocialAccountsCollectionSelect;
}

export interface PostFeedsCollection {
    count?: number;
    errors?: Error[];
    pagination?: Pagination;
    postFeeds?: PostFeed[];
}

export interface PostFeedsCollectionSelect {
    all?: boolean;
    count?: boolean;
    errors?: ErrorSelect;
    pagination?: PaginationSelect;
    postFeeds?: PostFeedSelect;
}

export interface PostFeedSelect {
    all?: boolean;
    alternativeIds?: IdSelect;
    createdAt?: TimestampSelect;
    id?: ServiceIdSelect;
    info?: InfoSelect;
    kind?: boolean;
    relations?: PostFeedRelationsSelect;
    relationships?: PostFeedRelationshipsSelect;
}

export interface PostFeedSort {
    createdAt?: TimestampSort;
    id?: ServiceIdSort;
    info?: InfoSort;
}

export interface PostFilter {
    alternativeIds?: IdListFilter;
    and?: PostFilter[];
    content?: TextFilter;
    createdAt?: TimestampFilter;
    id?: ServiceIdFilter;
    isPinned?: BoolFilter;
    isSensitive?: BoolFilter;
    kind?: EnumFilter;
    links?: HyperLinkListFilter;
    not?: PostFilter[];
    or?: PostFilter[];
    set?: boolean;
    spoilerText?: TextFilter;
    title?: TextFilter;
    totalWasRepliedToByPostsCount?: Int32Filter;
}

export interface PostListFilter {
    every?: PostFilter;
    none?: PostFilter;
    some?: PostFilter;
}

export interface PostRelations {
    attachesAttachments?: AttachmentsCollection;
    authoredBySocialAccount?: SocialAccount;
    bookmarkedBySocialAccounts?: SocialAccountsCollection;
    containedByPostFeeds?: PostFeedsCollection;
    favoredBySocialAccounts?: SocialAccountsCollection;
    mentionsSocialAccounts?: SocialAccountsCollection;
    mutedBySocialAccounts?: SocialAccountsCollection;
    notReadBySocialAccounts?: SocialAccountsCollection;
    readBySocialAccounts?: SocialAccountsCollection;
    rebloggedByPosts?: PostsCollection;
    rebloggedBySocialAccounts?: SocialAccountsCollection;
    reblogsPost?: Post;
    repliesToPost?: Post;
    repliesToSocialAccount?: SocialAccount;
    wasRepliedToByPosts?: PostsCollection;
}

export interface PostRelationships {
    authoredByMe?: boolean;
    bookmarkedByMe?: boolean;
    favoredByMe?: boolean;
    mentionsMe?: boolean;
    mutedByMe?: boolean;
    notReadByMe?: boolean;
    readByMe?: boolean;
    rebloggedByMe?: boolean;
    repliesToMe?: boolean;
}

export interface PostRelationshipsSelect {
    all?: boolean;
    authoredByMe?: boolean;
    bookmarkedByMe?: boolean;
    favoredByMe?: boolean;
    mentionsMe?: boolean;
    mutedByMe?: boolean;
    notReadByMe?: boolean;
    readByMe?: boolean;
    rebloggedByMe?: boolean;
    repliesToMe?: boolean;
}

export interface PostRelationsSelect {
    all?: boolean;
    attachesAttachments?: AttachmentsCollectionSelect;
    authoredBySocialAccount?: SocialAccountSelect;
    bookmarkedBySocialAccounts?: SocialAccountsCollectionSelect;
    containedByPostFeeds?: PostFeedsCollectionSelect;
    favoredBySocialAccounts?: SocialAccountsCollectionSelect;
    mentionsSocialAccounts?: SocialAccountsCollectionSelect;
    mutedBySocialAccounts?: SocialAccountsCollectionSelect;
    notReadBySocialAccounts?: SocialAccountsCollectionSelect;
    readBySocialAccounts?: SocialAccountsCollectionSelect;
    rebloggedByPosts?: PostsCollectionSelect;
    rebloggedBySocialAccounts?: SocialAccountsCollectionSelect;
    reblogsPost?: PostSelect;
    repliesToPost?: PostSelect;
    repliesToSocialAccount?: SocialAccountSelect;
    wasRepliedToByPosts?: PostsCollectionSelect;
}

export interface PostsCollection {
    count?: number;
    errors?: Error[];
    pagination?: Pagination;
    posts?: Post[];
}

export interface PostsCollectionSelect {
    all?: boolean;
    count?: boolean;
    errors?: ErrorSelect;
    pagination?: PaginationSelect;
    posts?: PostSelect;
}

export interface PostSelect {
    all?: boolean;
    alternativeIds?: IdSelect;
    content?: TextSelect;
    createdAt?: TimestampSelect;
    id?: ServiceIdSelect;
    isPinned?: boolean;
    isSensitive?: boolean;
    kind?: boolean;
    links?: HyperLinkSelect;
    relations?: PostRelationsSelect;
    relationships?: PostRelationshipsSelect;
    spoilerText?: TextSelect;
    title?: TextSelect;
    totalWasRepliedToByPostsCount?: boolean;
}

export interface PostSort {
    content?: TextSort;
    createdAt?: TimestampSort;
    id?: ServiceIdSort;
    isPinned?: string;
    isSensitive?: string;
    spoilerText?: TextSort;
    title?: TextSort;
    totalWasRepliedToByPostsCount?: string;
}

export interface RelationGetMode {
    id?: ServiceId;
    relation?: string;
}

export interface RelationGetModeFilter {
    and?: RelationGetModeFilter[];
    id?: ServiceIdFilter;
    not?: RelationGetModeFilter[];
    or?: RelationGetModeFilter[];
    relation?: StringFilter;
    set?: boolean;
}

export interface RequestMeta {
    createdAt?: Timestamp;
}

export interface RequestMetaFilter {
    and?: RequestMetaFilter[];
    createdAt?: TimestampFilter;
    not?: RequestMetaFilter[];
    or?: RequestMetaFilter[];
    set?: boolean;
}

export interface SearchGetMode {
    location?: LocationQuery;
    term?: string;
}

export interface SearchGetModeFilter {
    and?: SearchGetModeFilter[];
    location?: LocationQueryFilter;
    not?: SearchGetModeFilter[];
    or?: SearchGetModeFilter[];
    set?: boolean;
    term?: StringFilter;
}

export interface Service {
    alternativeIds?: Id[];
    createdAt?: Timestamp;
    endpoints?: Endpoints;
    id?: ServiceId;
    isVirtual?: boolean;
    name?: string;
    port?: number;
    sdkVersion?: string;
    transport?: string;
    url?: Url;
}

export interface ServiceFilter {
    alternativeIds?: IdListFilter;
    and?: ServiceFilter[];
    createdAt?: TimestampFilter;
    endpoints?: EndpointsFilter;
    id?: ServiceIdFilter;
    isVirtual?: BoolFilter;
    name?: StringFilter;
    not?: ServiceFilter[];
    or?: ServiceFilter[];
    port?: Int32Filter;
    sdkVersion?: StringFilter;
    set?: boolean;
    transport?: EnumFilter;
    url?: UrlFilter;
}

export interface ServiceId {
    serviceName?: string;
    value?: string;
}

export interface ServiceIdFilter {
    and?: ServiceIdFilter[];
    not?: ServiceIdFilter[];
    or?: ServiceIdFilter[];
    serviceName?: StringFilter;
    set?: boolean;
    value?: StringFilter;
}

export interface ServiceIdSelect {
    all?: boolean;
    serviceName?: boolean;
    value?: boolean;
}

export interface ServiceIdSort {
    serviceName?: string;
    value?: string;
}

export interface ServiceListFilter {
    every?: ServiceFilter;
    none?: ServiceFilter;
    some?: ServiceFilter;
}

export interface ServicePage {
    id?: ServiceId;
    page?: Page;
}

export interface ServicePageFilter {
    and?: ServicePageFilter[];
    id?: ServiceIdFilter;
    not?: ServicePageFilter[];
    or?: ServicePageFilter[];
    page?: PageFilter;
    set?: boolean;
}

export interface ServicePageListFilter {
    every?: ServicePageFilter;
    none?: ServicePageFilter;
    some?: ServicePageFilter;
}

export interface ServicePageSelect {
    all?: boolean;
    id?: ServiceIdSelect;
    page?: PageSelect;
}

export interface ServiceSelect {
    all?: boolean;
    alternativeIds?: IdSelect;
    createdAt?: TimestampSelect;
    id?: ServiceIdSelect;
    isVirtual?: boolean;
    name?: boolean;
    port?: boolean;
    sdkVersion?: boolean;
    transport?: boolean;
    url?: UrlSelect;
}

export interface SocialAccount {
    alternativeIds?: Id[];
    avatar?: Image;
    createdAt?: Timestamp;
    displayName?: string;
    header?: Image;
    id?: ServiceId;
    note?: Text;
    points?: number;
    relations?: SocialAccountRelations;
    relationships?: SocialAccountRelationships;
    username?: string;
}

export interface SocialAccountFilter {
    alternativeIds?: IdListFilter;
    and?: SocialAccountFilter[];
    avatar?: ImageFilter;
    createdAt?: TimestampFilter;
    displayName?: StringFilter;
    header?: ImageFilter;
    id?: ServiceIdFilter;
    not?: SocialAccountFilter[];
    note?: TextFilter;
    or?: SocialAccountFilter[];
    points?: Int32Filter;
    set?: boolean;
    username?: StringFilter;
}

export interface SocialAccountListFilter {
    every?: SocialAccountFilter;
    none?: SocialAccountFilter;
    some?: SocialAccountFilter;
}

export interface SocialAccountRelations {
    authorsPosts?: PostsCollection;
    blockedBySocialAccounts?: SocialAccountsCollection;
    blocksSocialAccounts?: SocialAccountsCollection;
    bookmarksPosts?: PostsCollection;
    favorsPosts?: PostsCollection;
    followedBySocialAccounts?: SocialAccountsCollection;
    followsSocialAccounts?: SocialAccountsCollection;
    mentionedByPosts?: PostsCollection;
    mutedBySocialAccounts?: SocialAccountsCollection;
    mutesPosts?: PostsCollection;
    mutesSocialAccounts?: SocialAccountsCollection;
    notReadPosts?: PostsCollection;
    participatesPostFeeds?: PostFeedsCollection;
    readPosts?: PostsCollection;
    reblogsPosts?: PostsCollection;
    requestedToBeFollowedBySocialAccounts?: SocialAccountsCollection;
    requestsToFollowSocialAccounts?: SocialAccountsCollection;
    wasRepliedToByPosts?: PostsCollection;
}

export interface SocialAccountRelationships {
    blockedByMe?: boolean;
    blocksMe?: boolean;
    followedByMe?: boolean;
    followsMe?: boolean;
    mutedByMe?: boolean;
    mutesMe?: boolean;
    requestedToBeFollowedByMe?: boolean;
    requestsToFollowMe?: boolean;
}

export interface SocialAccountRelationshipsSelect {
    all?: boolean;
    blockedByMe?: boolean;
    blocksMe?: boolean;
    followedByMe?: boolean;
    followsMe?: boolean;
    mutedByMe?: boolean;
    mutesMe?: boolean;
    requestedToBeFollowedByMe?: boolean;
    requestsToFollowMe?: boolean;
}

export interface SocialAccountRelationsSelect {
    all?: boolean;
    authorsPosts?: PostsCollectionSelect;
    blockedBySocialAccounts?: SocialAccountsCollectionSelect;
    blocksSocialAccounts?: SocialAccountsCollectionSelect;
    bookmarksPosts?: PostsCollectionSelect;
    favorsPosts?: PostsCollectionSelect;
    followedBySocialAccounts?: SocialAccountsCollectionSelect;
    followsSocialAccounts?: SocialAccountsCollectionSelect;
    mentionedByPosts?: PostsCollectionSelect;
    mutedBySocialAccounts?: SocialAccountsCollectionSelect;
    mutesPosts?: PostsCollectionSelect;
    mutesSocialAccounts?: SocialAccountsCollectionSelect;
    notReadPosts?: PostsCollectionSelect;
    participatesPostFeeds?: PostFeedsCollectionSelect;
    readPosts?: PostsCollectionSelect;
    reblogsPosts?: PostsCollectionSelect;
    requestedToBeFollowedBySocialAccounts?: SocialAccountsCollectionSelect;
    requestsToFollowSocialAccounts?: SocialAccountsCollectionSelect;
    wasRepliedToByPosts?: PostsCollectionSelect;
}

export interface SocialAccountsCollection {
    count?: number;
    errors?: Error[];
    pagination?: Pagination;
    socialAccounts?: SocialAccount[];
}

export interface SocialAccountsCollectionSelect {
    all?: boolean;
    count?: boolean;
    errors?: ErrorSelect;
    pagination?: PaginationSelect;
    socialAccounts?: SocialAccountSelect;
}

export interface SocialAccountSelect {
    all?: boolean;
    alternativeIds?: IdSelect;
    avatar?: ImageSelect;
    createdAt?: TimestampSelect;
    displayName?: boolean;
    header?: ImageSelect;
    id?: ServiceIdSelect;
    note?: TextSelect;
    points?: boolean;
    relations?: SocialAccountRelationsSelect;
    relationships?: SocialAccountRelationshipsSelect;
    username?: boolean;
}

export interface SocialAccountSort {
    avatar?: ImageSort;
    createdAt?: TimestampSort;
    displayName?: string;
    header?: ImageSort;
    id?: ServiceIdSort;
    note?: TextSort;
    points?: string;
    username?: string;
}

export interface StringFilter {
    and?: StringFilter[];
    caseSensitive?: boolean;
    contains?: string;
    endsWith?: string;
    in?: string[];
    is?: string;
    not?: string;
    notContains?: string;
    notEndsWith?: string;
    notIn?: string[];
    notStartsWith?: string;
    or?: StringFilter[];
    set?: boolean;
    startsWith?: string;
}

export interface StringListFilter {
    and?: StringFilter;
    not?: StringFilter;
    or?: StringFilter;
}

export interface Text {
    formatting?: string;
    language?: string;
    value?: string;
}

export interface TextFilter {
    and?: TextFilter[];
    formatting?: EnumFilter;
    language?: EnumFilter;
    not?: TextFilter[];
    or?: TextFilter[];
    set?: boolean;
    value?: StringFilter;
}

export interface TextSelect {
    all?: boolean;
    formatting?: boolean;
    language?: boolean;
    value?: boolean;
}

export interface TextSort {
    value?: string;
}

export interface Timestamp {
    kind?: string;
    unix?: DurationScalar;
}

export interface TimestampFilter {
    and?: TimestampFilter[];
    kind?: EnumFilter;
    not?: TimestampFilter[];
    or?: TimestampFilter[];
    set?: boolean;
    unix?: DurationScalarFilter;
}

export interface TimestampSelect {
    all?: boolean;
    kind?: boolean;
    unix?: DurationScalarSelect;
}

export interface TimestampSort {
    unix?: DurationScalarSort;
}

export interface Url {
    value?: string;
}

export interface UrlFilter {
    and?: UrlFilter[];
    not?: UrlFilter[];
    or?: UrlFilter[];
    set?: boolean;
    value?: StringFilter;
}

export interface UrlSelect {
    all?: boolean;
    value?: boolean;
}

export interface UrlSort {
    value?: string;
}

export interface WhateverFilter {
    alternativeIds?: IdListFilter;
    and?: WhateverFilter[];
    boolField?: BoolFilter;
    boolList?: BoolListFilter;
    createdAt?: TimestampFilter;
    enumField?: EnumFilter;
    enumList?: EnumListFilter;
    float64Field?: Float64Filter;
    float64List?: Float64ListFilter;
    id?: ServiceIdFilter;
    int32Field?: Int32Filter;
    int32List?: Int32ListFilter;
    not?: WhateverFilter[];
    or?: WhateverFilter[];
    set?: boolean;
    stringField?: StringFilter;
    stringList?: StringListFilter;
    unionField?: WhateverUnionFilter;
    unionList?: WhateverUnionListFilter;
}

export interface WhateverListFilter {
    every?: WhateverFilter;
    none?: WhateverFilter;
    some?: WhateverFilter;
}

export interface WhateverUnionFilter {
    and?: WhateverUnionFilter[];
    boolField?: BoolFilter;
    enumField?: EnumFilter;
    float64Field?: Float64Filter;
    int32Field?: Int32Filter;
    kind?: EnumFilter;
    not?: WhateverUnionFilter[];
    or?: WhateverUnionFilter[];
    set?: boolean;
    stringField?: StringFilter;
}

export interface WhateverUnionListFilter {
    every?: WhateverUnionFilter;
    none?: WhateverUnionFilter;
    some?: WhateverUnionFilter;
}
