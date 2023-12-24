
export const pageConfig = {
  defaultPageSize: 10,
  defaultPage: 1,
};


/**
 *
 * @param {object} context 前端request 的context
 * @return {obj} 返回搜索的页面，记录开始值，返回条数
 */

export function getPageParamsByContext(context) {
  let query = context.query;
  let _page = Number(query.page) || pageConfig.defaultPage;
  if (_page < 1) {
    _page = 1;
  }
  let _limit = Number(query.limit) || pageConfig.defaultPageSize;
  if (_limit < 1) {
    _limit = pageConfig.defaultPageSize;
  }

  let _start = (_page - 1) * _limit;
  let _search = query.search || "";
  let _force = query.force || false;

  return {
    _page,
    _start,
    _limit,
    _search,
    _force,
  };
}