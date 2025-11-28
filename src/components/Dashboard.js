import Profile from "./Profile";

function Dashboard({ user }) {
  // ...existing code

  return (
    <div className="dashboard-container">
      {/* Balance */}
      <div className="dashboard-card balance-card">
        <h2>Account Balance</h2>
        <p className="balance-amount">${account?.balance?.toLocaleString() || 0}</p>
      </div>

      {/* Transactions */}
      <div className="dashboard-card transactions-card">
        {/* existing transaction table */}
      </div>

      {/* Transfer Funds */}
      <div className="dashboard-card transfer-card">
        <TransferFunds user={user} />
      </div>

      {/* Deposit / Withdraw */}
      <div className="dashboard-card deposit-card">
        <DepositWithdraw user={user} />
      </div>

      {/* Profile Section */}
      <div className="dashboard-card profile-card">
        <Profile user={user} />
      </div>
    </div>
  );
}
