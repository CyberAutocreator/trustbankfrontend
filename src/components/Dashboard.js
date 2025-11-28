import DepositWithdraw from "./DepositWithdraw";

function Dashboard({ user }) {
  // ...existing code

  return (
    <div className="dashboard-container">
      {/* Balance */}
      <div className="dashboard-card balance-card">
        <h2>Account Balance</h2>
        <p className="balance-amount">${account?.balance?.toLocaleString()}</p>
      </div>

      {/* Transactions */}
      <div className="dashboard-card transactions-card">
        {/* existing table */}
      </div>

      {/* Transfer Funds */}
      <div className="dashboard-card transfer-card">
        <TransferFunds user={user} />
      </div>

      {/* Deposit / Withdraw */}
      <div className="dashboard-card deposit-card">
        <DepositWithdraw user={user} />
      </div>

      {/* Analytics */}
      <div className="dashboard-card analytics-card">
        <h2>Spending Analytics</h2>
        <p>Charts and insights will appear here.</p>
      </div>
    </div>
  );
}
