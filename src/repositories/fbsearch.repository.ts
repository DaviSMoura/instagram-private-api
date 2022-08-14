import { Repository } from '../core/repository';
import {
  FbsearchRepositoryPlacesResponseRootObject,
  FbsearchRepositoryTopsearchFlatResponseRootObject,
} from '../responses';
import { Expose } from 'class-transformer';
export class FbsearchRepository extends Repository {

  ranktoken:string;
  page:string;
  @Expose()
moreAvailable:boolean;
@Expose()
nextMaxId:string;
  set state(body) {
    this.moreAvailable = body.has_more;
    this.page = body.page_token;
    this.nextMaxId=body.next_max_id;
    this.ranktoken=body.rank_token;
  }
  async suggestedSearches(type: 'blended' | 'users' | 'hashtags' | 'places') {
    const { body } = await this.client.request.send({
      url: '/api/v1/fbsearch/suggested_searches/',
      qs: {
        type,
      },
    });
    return body;
  }
  async recentSearches() {
    const { body } = await this.client.request.send({
      url: '/api/v1/fbsearch/recent_searches/',
    });
    return body;
  }

  async topsearchFlat(query: string): Promise<FbsearchRepositoryTopsearchFlatResponseRootObject> {
    const { body } = await this.client.request.send<FbsearchRepositoryTopsearchFlatResponseRootObject>({
      url: '/api/v1/fbsearch/topsearch_flat/',
      qs: {
        timezone_offset: this.client.state.timezoneOffset,
        count: 30,
        query,
        context: 'blended',
      },
    });

    return body;
  }
  async places(query: string) {
    const { body } = await this.client.request.send<FbsearchRepositoryPlacesResponseRootObject>({
      url: '/api/v1/fbsearch/places/',
      qs: {
        timezone_offset: this.client.state.timezoneOffset,
        count: 30,
        query,
      },
    });
    return body;
  }
  async topSearch(query: string) {
    const { body } = await this.client.request.send({
      url: '/api/v1/fbsearch/top_serp/',
      qs: {
        timezone_offset: this.client.state.timezoneOffset,
        count: 30,
        query,
        search_surface:"top_serp",
        max_id:this.nextMaxId,
        rank_token:this.ranktoken
      },
    });
    this.state=body.media_grid;
    return body.media_grid.sections;
  }
}
