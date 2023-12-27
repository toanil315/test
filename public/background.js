const onCompletedListener = (details) => {
  if (details.method === 'POST' && details.url.includes('https://qa-nexthcm-api.banvien.com.vn')) {
    console.log('====DETAILS: ', details);
  }

  return { cancel: false };
};

chrome.webRequest.onBeforeRequest.addListener(
  onCompletedListener,
  {
    urls: ['*://*/*'],
  },
  ['requestBody', 'extraHeaders'],
);

chrome.runtime.onMessage.addListener((message) => {
  if (message.type === 'submit-leave') {
    const { range, duration } = message;
    const [from, to] = range.split('-');
    fetch('http://20.198.241.197:3000/users/leaves', {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to,
        user: 'toan.dang-cong',
        duration,
      }),
    });
  }
  return true;
});
