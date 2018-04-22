let site_address = 'some url';
export default {
    site_address: () => site_address,
    image_url: dbfId => site_address + '/cardsImages/rel/' + dbfId + '.png',
    multiScore: (classCode, log, roster) => {
        const baseUrl = site_address + '/arena?className=' + classCode;
        const logSegment = log.map(item => 'pick=' + item.id).join('&');
        const rosterSegment = roster.map(item => 'roster=' + item.id).join('&');
        return [baseUrl, logSegment, rosterSegment].filter(item => !!item).join('&');
    }
}