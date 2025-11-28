import TransactionSearch from "./TransactionSearch";

function Dashboard({ user }) {
  const [account, setAccount] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const { data: accountData } = await supabase
        .from("accounts")
        .select("*")
        .eq("user_id", user.id)
        .single();

      setAccount(accountData);

      const { data: transactionData } = await supabase
        .from("transactions")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      setTransactions(transactionData || []);
      setFiltered(transactionData || []);
    }

    if (user) fetchData();
  }, [user]);

  return (
    <div className="dashboard-container">
      {/* Balance */}
      <div className="dashboard-card balance-card">
        <h2>Account Balance</h2>
        <p className="balance-amount">${account?.balance?.toLocaleString()}</p>
      </div>

      {/* Transactions */}
      <div className="dashboard-card transactions-card">
        <h2>Transaction History</h2>
        <TransactionSearch
          transactions={transactions}
          setFiltered={setFiltered}
        />
        <table>
          <thead>
            <tr>
              <th>Description</th>
              <th>Amount</th>
              <th>Category</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((tx) => (
              <tr key={tx.id}>
                <td>{tx.description}</td>
                <td className={tx.amount < 0 ? "negative" : "positive"}>
                  {tx.amount < 0 ? "-" : "+"}${Math.abs(tx.amount).toLocaleString()}
                </td>
                <td>{tx.category || "—"}</td>
                <td>{new Date(tx.created_at).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Transfer Funds */}
      <div className="dashboard-card transfer-card">
        <TransferFunds user={user} />
      </div>

      {/* Deposit / Withdraw */}
      <div className="dashboard-card deposit-card">
        <DepositWithdraw user={user} />
      </div>
    </div>
  );
}
