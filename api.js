function getDataByFetch(url) {
	return fetch(`${url}`, {
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
	})
		.then(req => {
			if (req.status >= 200 && req.status < 300) {
				return Promise.resolve(req);
			} else {
				return Promise.reject(new Error(req.statusText));
			}
		})
		.then(req => req.json())
		.catch(err => {
			return `'Error: ', ${err}`;
		});
}
