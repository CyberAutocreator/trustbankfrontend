const [page, setPage] = useState(1);

useEffect(() => {
  fetch(`${API}/transactions?page=${page}&limit=50`, {
    headers: { Authorization: `Bearer ${token}` }
  })
    .then(res => res.json())
    .then(data => {
      setTransactions(data.transactions);
      setTotal(data.total);
    });
}, [page]);
