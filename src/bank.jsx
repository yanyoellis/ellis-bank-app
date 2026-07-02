import React, { useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BarChart3,
  Bell,
  Check,
  ChevronRight,
  CircleDollarSign,
  CreditCard,
  Eye,
  Fingerprint,
  Home,
  LockKeyhole,
  Menu,
  Minus,
  Palette,
  Plus,
  Search,
  Send,
  ShieldCheck,
  Sparkles,
  Target,
  UserRound,
  Wallet,
  X,
  Zap,
} from "lucide-react";
import "./bank.css";

const colors = [
  ["Ellis Black", "#18201f"],
  ["Champagne Pearl", "#d8c5a7"],
  ["Dusty Rose", "#d3a6a4"],
  ["Sage Green", "#8fa092"],
  ["Powder Blue", "#9fb7c8"],
  ["Soft Lavender", "#aaa2bd"],
];
const accounts = [
  ["Main Account", "€12,450.00", "EUR • Personal"],
  ["Savings", "€8,900.00", "Goal: London move"],
  ["Business", "€3,330.40", "Freelance design income"],
  ["Travel Wallet", "£1,240.00", "GBP • Ready for London"],
];
const tx = [
  ["The Connaught", "Today · Dining", "−€186.00", "TC"],
  ["Apple Store", "Yesterday · Shopping", "−€1,299.00", "AP"],
  ["Uber Black", "Yesterday · Transport", "−€34.80", "UB"],
];
const screens = [
  ["OVERVIEW", ["Home", "Accounts", "Notifications"]],
  ["MONEY", ["Transfers", "Payments", "Analytics", "Vaults", "Investments"]],
  ["PREMIUM", ["Card Details", "Card Design", "Lifestyle"]],
  ["ACCOUNT", ["Profile", "Security", "Private Assistant"]],
];
const routeMap = {
  Home: "home",
  Accounts: "accounts",
  Notifications: "notifications",
  Transfers: "transfers",
  Payments: "payments",
  Analytics: "analytics",
  Vaults: "vaults",
  Investments: "investments",
  "Card Details": "card",
  "Card Design": "customize",
  Lifestyle: "lifestyle",
  Profile: "profile",
  Security: "security",
  "Private Assistant": "support",
};

function EBLogo({ small = false }) {
  return (
    <div className={`eb-logo ${small ? "small" : ""}`}>
      <i>E</i>
      <span>ELLIS</span>
    </div>
  );
}
function BankCard({
  color = "#18201f",
  frozen = false,
  onClick,
  className = "",
}) {
  return (
    <button
      className={`bank-card ${frozen ? "frozen" : ""} ${className}`}
      style={{ "--bank-card": color }}
      onClick={onClick}
    >
      <div className="bc-top">
        <EBLogo small />
        <span>VISA</span>
      </div>
      <div className="bc-chip">
        <i />
        <i />
      </div>
      <div className="bc-number">•••• 4821</div>
      <div className="bc-bottom">
        <span>
          <small>CARDHOLDER</small>YANA ELLIS
        </span>
        <span>
          <small>EXPIRES</small>08/29
        </span>
      </div>
      {frozen && (
        <div className="frozen-layer">
          <LockKeyhole />
          <b>Card frozen</b>
        </div>
      )}
    </button>
  );
}
function StatusBar() {
  return (
    <div className="app-status">
      <b>9:41</b>
      <div>
        <i />
        <i />
        <i />
      </div>
    </div>
  );
}
function Header({ title, back, onBack, right, eyebrow }) {
  const safeRight =
    React.isValidElement(right) &&
    right.type === "button" &&
    !right.props.onClick
      ? React.cloneElement(right, {
          onClick: (e) => e.currentTarget.classList.toggle("active"),
        })
      : right;
  return (
    <header className="screen-header">
      {back ? (
        <button onClick={onBack} aria-label="Go back">
          <ArrowLeft />
        </button>
      ) : (
        <div className="header-spacer" />
      )}
      <div>
        {eyebrow && <small>{eyebrow}</small>}
        <h1>{title}</h1>
      </div>
      {safeRight || <div className="header-spacer" />}
    </header>
  );
}
function Primary({ children, onClick, disabled = false, secondary = false }) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`app-primary ${secondary ? "secondary" : ""}`}
    >
      {children}
    </button>
  );
}
function Toggle({ on, label, state, setState }) {
  return (
    <button className="setting-row" onClick={() => setState?.(!state)}>
      <span>{label}</span>
      <i className={state ? "on" : ""}>
        <b />
      </i>
      {on && <small>{on}</small>}
    </button>
  );
}
function TransactionList({ items = tx, onSelect }) {
  const [selected, setSelected] = useState(-1);
  return (
    <div className="transaction-list">
      {items.map((t, i) => (
        <button
          className={selected === i ? "selected" : ""}
          key={t[0]}
          onClick={() => {
            setSelected(i);
            onSelect?.(t);
          }}
        >
          <i>{t[3] || t[0].slice(0, 2)}</i>
          <span>
            <b>{t[0]}</b>
            <small>
              {selected === i && !onSelect ? "Details selected" : t[1]}
            </small>
          </span>
          <strong className={t[2]?.startsWith("+") ? "positive" : ""}>
            {t[2]}
          </strong>
          <ChevronRight />
        </button>
      ))}
    </div>
  );
}
function BottomNav({ route, setRoute }) {
  const items = [
    [Home, "Home", "home"],
    [CreditCard, "Cards", "card"],
    [CircleDollarSign, "Payments", "payments"],
    [BarChart3, "Analytics", "analytics"],
    [UserRound, "Profile", "profile"],
  ];
  return (
    <nav className="bottom-nav">
      {items.map(([Icon, label, r]) => (
        <button
          key={r}
          className={route === r ? "active" : ""}
          onClick={() => setRoute(r)}
        >
          <Icon />
          <span>{label}</span>
        </button>
      ))}
    </nav>
  );
}

function Splash({ next }) {
  useEffect(() => {
    const t = setTimeout(next, 1350);
    return () => clearTimeout(t);
  }, [next]);
  return (
    <div className="splash-screen" onClick={next}>
      <div className="splash-orbit">
        <EBLogo />
      </div>
      <div>
        <h1>Ellis Bank</h1>
        <p>Private banking, redesigned.</p>
      </div>
    </div>
  );
}
function Onboarding({ index, setIndex, login }) {
  const data = [
    [
      "Banking that feels expensive.",
      "Manage your money, cards and lifestyle benefits in one elegant private banking experience.",
    ],
    [
      "Everything under control.",
      "Track spending, move money, manage limits and review insights with complete clarity.",
    ],
    [
      "Designed around you.",
      "Personalize your card, protect your account and access premium support whenever you need it.",
    ],
  ];
  return (
    <div className={`onboarding ob-${index}`}>
      <div className="ob-art">
        <div className="ob-ring r1" />
        <div className="ob-ring r2" />
        <div className="ob-object">
          {index === 0 ? (
            <BankCard />
          ) : index === 1 ? (
            <div className="ob-balance">
              <small>TOTAL BALANCE</small>
              <b>€24,680.40</b>
              <span>Everything in order</span>
            </div>
          ) : (
            <div className="ob-fingerprint">
              <Fingerprint />
            </div>
          )}
        </div>
      </div>
      <div className="ob-copy">
        <div className="ob-dots">
          {[0, 1, 2].map((i) => (
            <i className={i === index ? "active" : ""} key={i} />
          ))}
        </div>
        <h1>{data[index][0]}</h1>
        <p>{data[index][1]}</p>
        {index < 2 ? (
          <Primary onClick={() => setIndex(index + 1)}>
            Continue <ArrowRight />
          </Primary>
        ) : (
          <>
            <Primary onClick={login}>
              Get Started <ArrowRight />
            </Primary>
            <button className="text-action" onClick={login}>
              I already have an account
            </button>
          </>
        )}
      </div>
    </div>
  );
}
function Login({ unlock }) {
  const [loading, setLoading] = useState(false);
  const go = () => {
    setLoading(true);
    setTimeout(unlock, 850);
  };
  return (
    <div className="login-screen">
      <div className="login-top">
        <EBLogo />
        <div className={`face-orb ${loading ? "scanning" : ""}`}>
          <Fingerprint />
        </div>
      </div>
      <div className="login-copy">
        <small>PRIVATE CLIENT ACCESS</small>
        <h1>
          Welcome back,
          <br />
          Yana
        </h1>
        <p>Use Face ID to access your account securely.</p>
        <Primary onClick={go}>
          {loading ? (
            "Recognizing…"
          ) : (
            <>
              <Fingerprint />
              Unlock with Face ID
            </>
          )}
        </Primary>
        <button className="text-action" onClick={unlock}>
          Use passcode
        </button>
        <div className="encrypted">
          <ShieldCheck />
          Your data is encrypted and protected with bank-grade security.
        </div>
      </div>
    </div>
  );
}

function HomeScreen({ go, color, frozen }) {
  return (
    <div className="screen home-screen">
      <div className="home-top">
        <div>
          <small>GOOD EVENING, YANA</small>
          <h1>
            Your money
            <br />
            is in order.
          </h1>
        </div>
        <div className="home-actions">
          <button
            onClick={() => go("notifications")}
            aria-label="Notifications"
          >
            <Bell />
            <i />
          </button>
          <button className="profile-avatar" onClick={() => go("profile")}>
            YE
          </button>
        </div>
      </div>
      <section className="balance-card">
        <small>Total balance across all accounts</small>
        <strong>
          €24,680<sup>.40</sup>
        </strong>
        <span>+€1,240 this month</span>
      </section>
      <BankCard color={color} frozen={frozen} onClick={() => go("card")} />
      <div className="available">
        <span>Ellis Black</span>
        <b>€12,450.00 available</b>
      </div>
      <div className="quick-grid">
        {[
          [Send, "Send", "transfers"],
          [ArrowRight, "Request", "request"],
          [Plus, "Top Up", "topup"],
          [Zap, "Exchange", "exchange"],
        ].map(([Icon, l, r]) => (
          <button onClick={() => go(r)} key={l}>
            <i>
              <Icon />
            </i>
            <span>{l}</span>
          </button>
        ))}
      </div>
      <section className="app-section">
        <div className="section-row">
          <h2>Upcoming</h2>
          <button onClick={() => go("payments")}>See all</button>
        </div>
        <div className="upcoming-list">
          {[
            ["London Rent", "Tomorrow", "€2,400"],
            ["Spotify Premium", "Jul 04", "€12.99"],
            ["UAL Application Fee", "Jul 08", "€27"],
          ].map((x) => (
            <button key={x[0]} onClick={() => go("payment-detail", x)}>
              <i>
                <CircleDollarSign />
              </i>
              <span>
                <b>{x[0]}</b>
                <small>{x[1]}</small>
              </span>
              <strong>{x[2]}</strong>
            </button>
          ))}
        </div>
      </section>
      <button className="spend-overview" onClick={() => go("analytics")}>
        <div>
          <small>THIS MONTH</small>
          <b>€3,284 spent</b>
          <span>12% lower than last month</span>
        </div>
        <div className="mini-bars">
          {[35, 64, 48, 80, 58].map((h, i) => (
            <i key={i} style={{ height: h + "%" }} />
          ))}
        </div>
      </button>
    </div>
  );
}

function Accounts({ go }) {
  return (
    <div className="screen">
      <Header
        title="Accounts"
        back
        onBack={() => go("home")}
        right={
          <button className="round-button" onClick={() => go("add-account")}>
            <Plus />
          </button>
        }
      />
      <p className="screen-lead">All your money, clearly separated.</p>
      <div className="account-stack">
        {accounts.map((a, i) => (
          <button
            key={a[0]}
            onClick={() => go("account-detail", a)}
            className={`account-card ac-${i}`}
          >
            <small>{a[2]}</small>
            <b>{a[0]}</b>
            <strong>{a[1]}</strong>
            <span>
              View account <ArrowRight />
            </span>
          </button>
        ))}
      </div>
      <Primary onClick={() => go("add-account")}>
        <Plus />
        Add new account
      </Primary>
    </div>
  );
}
function CardDetails({ go, color, frozen, setFrozen, toast }) {
  return (
    <div className="screen">
      <Header
        title="Ellis Black Card"
        back
        onBack={() => go("home")}
        eyebrow={frozen ? "CARD FROZEN" : "ACTIVE CARD"}
      />
      <BankCard color={color} frozen={frozen} />
      {frozen && (
        <div className="state-banner error">
          <LockKeyhole />
          <span>
            <b>Card frozen</b>
            <small>Payments and withdrawals are temporarily disabled.</small>
          </span>
        </div>
      )}
      <div className="card-actions">
        {[
          [
            frozen ? Check : LockKeyhole,
            frozen ? "Unfreeze Card" : "Freeze Card",
            () => {
              setFrozen(!frozen);
              toast(frozen ? "Card is active" : "Card frozen");
            },
          ],
          [ShieldCheck, "Change PIN", () => toast("PIN flow secured")],
          [Eye, "View Card Details", () => toast("Face ID required")],
          [Palette, "Customize Card", () => go("customize")],
          [Target, "Set Limits", () => go("limits")],
        ].map(([Icon, l, fn]) => (
          <button onClick={fn} key={l}>
            <i>
              <Icon />
            </i>
            <span>{l}</span>
            <ChevronRight />
          </button>
        ))}
      </div>
      <div className="details-grid">
        <span>
          <small>Card number</small>
          <b>•••• •••• •••• 4821</b>
        </span>
        <span>
          <small>Cardholder</small>
          <b>YANA ELLIS</b>
        </span>
        <span>
          <small>Expiry</small>
          <b>08/29</b>
        </span>
        <span>
          <small>Daily limit</small>
          <b>€5,000</b>
        </span>
        <span>
          <small>Online payments</small>
          <b>Enabled</b>
        </span>
        <span>
          <small>ATM withdrawals</small>
          <b>Enabled</b>
        </span>
      </div>
      <div className="section-row">
        <h2>Recent activity</h2>
        <button onClick={() => go("all-transactions")}>See all</button>
      </div>
      <TransactionList onSelect={(t) => go("transaction", t)} />
    </div>
  );
}
function Customize({ go, color, setColor, toast }) {
  const [selected, setSelected] = useState(color);
  return (
    <div className="screen">
      <Header title="Design your card" back onBack={() => go("card")} />
      <p className="screen-lead">Choose a finish that matches your style.</p>
      <BankCard color={selected} className="custom-card" />
      <div className="color-list">
        {colors.slice(1).map(([n, c]) => (
          <button
            className={selected === c ? "selected" : ""}
            key={n}
            onClick={() => setSelected(c)}
          >
            <i style={{ background: c }}>{selected === c && <Check />}</i>
            <span>
              <b>{n}</b>
              <small>{selected === c ? "Selected" : "Tap to preview"}</small>
            </span>
            <ChevronRight />
          </button>
        ))}
      </div>
      <Primary
        onClick={() => {
          setColor(selected);
          toast("Card updated · Your new Ellis card design has been saved.");
          go("card");
        }}
      >
        Apply Design
      </Primary>
      <Primary secondary onClick={() => setSelected(colors[0][1])}>
        Reset to Ellis Black
      </Primary>
    </div>
  );
}

function Transfers({ go, setTransfer }) {
  const [form, setForm] = useState({
    recipient: "",
    amount: "",
    currency: "EUR",
    message: "",
  });
  const upd = (k, v) => setForm({ ...form, [k]: v });
  return (
    <div className="screen">
      <Header title="Send Money" back onBack={() => go("home")} />
      <div className="recipient-strip">
        <small>QUICK RECIPIENTS</small>
        <div>
          {["Anna", "Dima", "Marta", "Alex"].map((n, i) => (
            <button
              key={n}
              onClick={() =>
                upd("recipient", n === "Anna" ? "Anna Kowalska" : n)
              }
            >
              <i>{n[0]}</i>
              <span>{n}</span>
            </button>
          ))}
        </div>
      </div>
      <div className="transfer-form">
        <label>
          Recipient
          <input
            value={form.recipient}
            onChange={(e) => upd("recipient", e.target.value)}
            placeholder="Name, IBAN or phone"
          />
        </label>
        <label>
          Amount
          <div className="amount-input">
            <select
              value={form.currency}
              onChange={(e) => upd("currency", e.target.value)}
            >
              <option>EUR</option>
              <option>GBP</option>
              <option>USD</option>
            </select>
            <input
              value={form.amount}
              onChange={(e) => upd("amount", e.target.value)}
              inputMode="decimal"
              placeholder="€0.00"
            />
          </div>
        </label>
        <label>
          Message optional
          <input
            value={form.message}
            onChange={(e) => upd("message", e.target.value)}
            placeholder="Add a note"
          />
        </label>
      </div>
      <Primary
        disabled={!form.recipient || !form.amount}
        onClick={() => {
          setTransfer(form);
          go("confirm");
        }}
      >
        Continue <ArrowRight />
      </Primary>
      <section className="app-section">
        <h2>Recent transfers</h2>
        <TransactionList
          items={[
            ["Anna Kowalska", "Jun 28", "−€120", "AK"],
            ["Marta Nowak", "Jun 25", "−€85", "MN"],
            ["Alex Morgan", "Jun 20", "−£250", "AM"],
          ]}
          onSelect={(t) => {
            setForm({
              ...form,
              recipient: t[0],
              amount: t[2].replace(/[^0-9.]/g, ""),
            });
          }}
        />
      </section>
    </div>
  );
}
function ConfirmTransfer({ go, transfer }) {
  const name = transfer.recipient || "Anna Kowalska",
    amount = transfer.amount || "120.00";
  const [failed, setFailed] = useState(false);
  if (failed) return <TransferError go={go} />;
  return (
    <div className="screen confirm-screen">
      <Header title="Confirm transfer" back onBack={() => go("transfers")} />
      <div className="confirm-person">
        <i>{name.slice(0, 2).toUpperCase()}</i>
        <small>You are sending</small>
        <b>{name}</b>
        <strong>€{Number(amount).toFixed(2)}</strong>
      </div>
      <div className="review-box">
        <span>
          Recipient <b>{name}</b>
        </span>
        <span>
          Amount <b>€{Number(amount).toFixed(2)}</b>
        </span>
        <span>
          Fee <b>€0.00</b>
        </span>
        <span>
          Delivery <b>Instant</b>
        </span>
        <span>
          From <b>Main Account •••• 4821</b>
        </span>
      </div>
      <div className="secure-copy">
        <ShieldCheck />
        Protected with Face ID and encrypted confirmation.
      </div>
      <Primary
        onClick={() =>
          Number(amount) > 9999 ? setFailed(true) : go("transfer-success")
        }
      >
        Confirm Transfer <Fingerprint />
      </Primary>
      <button className="text-action" onClick={() => go("transfers")}>
        Edit Details
      </button>
    </div>
  );
}
function TransferSuccess({ go, transfer }) {
  const name = transfer.recipient || "Anna Kowalska",
    amount = transfer.amount || "120.00";
  return (
    <div className="success-state">
      <div className="success-rings">
        <i>
          <Check />
        </i>
      </div>
      <small>TRANSFER SENT</small>
      <h1>€{Number(amount).toFixed(2)}</h1>
      <p>was sent to {name}.</p>
      <div className="success-meta">
        <span>
          Delivery <b>Instant</b>
        </span>
        <span>
          Reference <b>EB-728491</b>
        </span>
      </div>
      <Primary onClick={() => go("home")}>Done</Primary>
      <Primary secondary onClick={() => go("receipt")}>
        View Receipt
      </Primary>
    </div>
  );
}
function TransferError({ go }) {
  return (
    <div className="success-state error-state">
      <div className="success-rings">
        <i>
          <X />
        </i>
      </div>
      <small>TRANSFER FAILED</small>
      <h1>Something went wrong.</h1>
      <p>Please check the details and try again.</p>
      <Primary onClick={() => go("transfers")}>Try Again</Primary>
      <Primary secondary onClick={() => go("home")}>
        Cancel
      </Primary>
    </div>
  );
}

function Payments({ go }) {
  return (
    <div className="screen">
      <Header title="Payments" back onBack={() => go("home")} />
      <p className="screen-lead">Pay essentials in a few quiet taps.</p>
      <div className="payment-categories">
        {[
          "Utilities",
          "Mobile",
          "Internet",
          "Rent",
          "Subscriptions",
          "Taxes",
          "Education",
          "Insurance",
        ].map((x, i) => (
          <button
            key={x}
            onClick={() => go("payment-detail", [x, "New payment", ""])}
          >
            <i>{["U", "M", "I", "R", "S", "T", "E", "I"][i]}</i>
            <span>{x}</span>
          </button>
        ))}
      </div>
      <div className="section-row">
        <h2>Saved payments</h2>
        <button onClick={() => go("payment-detail")}>Add</button>
      </div>
      <div className="saved-list">
        {[
          ["London Rent", "Due tomorrow", "€2,400"],
          ["Vodafone", "Autopay · Jul 06", "€42"],
          ["Netflix", "Autopay · Jul 09", "€19.99"],
          ["UAL Application Fee", "Due Jul 08", "€27"],
        ].map((x) => (
          <button key={x[0]} onClick={() => go("payment-detail", x)}>
            <i>
              <CircleDollarSign />
            </i>
            <span>
              <b>{x[0]}</b>
              <small>{x[1]}</small>
            </span>
            <strong>{x[2]}</strong>
            <ChevronRight />
          </button>
        ))}
      </div>
      <Primary onClick={() => go("payment-detail")}>
        <Plus />
        Add Payment
      </Primary>
    </div>
  );
}
function Analytics({ go }) {
  return (
    <div className="screen analytics-screen">
      <Header title="Analytics" back onBack={() => go("home")} />
      <div className="analytics-total">
        <small>SPENT THIS MONTH</small>
        <b>€3,284</b>
        <span>↓ 12% less than last month</span>
      </div>
      <div className="big-chart">
        {[38, 60, 48, 78, 64, 90, 56, 72, 45, 63, 80, 58].map((h, i) => (
          <i
            style={{ height: h + "%" }}
            className={i === 5 ? "peak" : ""}
            key={i}
          />
        ))}
        <div className="chart-labels">
          <span>W1</span>
          <span>W2</span>
          <span>W3</span>
          <span>W4</span>
        </div>
      </div>
      <div className="category-spend">
        {[
          ["Dining", "€820", "25%", "#8d5f4a"],
          ["Shopping", "€640", "19%", "#9d7f9d"],
          ["Travel", "€430", "13%", "#738b82"],
          ["Transport", "€210", "6%", "#b29b70"],
          ["Subscriptions", "€94", "3%", "#7790a0"],
        ].map((x) => (
          <button key={x[0]} onClick={() => go("all-transactions")}>
            <i style={{ background: x[3] }} />
            <span>{x[0]}</span>
            <b>{x[1]}</b>
            <small>{x[2]}</small>
          </button>
        ))}
      </div>
      <div className="insight-card">
        <Sparkles />
        <small>ELLIS INSIGHT</small>
        <b>You spent less on transport this month.</b>
        <p>Nice. Your Uber habit is behaving for once.</p>
      </div>
      <div className="insight-card rose">
        <small>SPENDING SHIFT</small>
        <b>Shopping increased by 18%.</b>
        <p>Mostly fashion and tech purchases.</p>
      </div>
      <Primary onClick={() => go("all-transactions")}>
        View all transactions
      </Primary>
      <Primary secondary onClick={() => go("budget")}>
        Set monthly budget
      </Primary>
    </div>
  );
}
function Vaults({ go, toast }) {
  return (
    <div className="screen">
      <Header
        title="Vaults"
        back
        onBack={() => go("home")}
        right={
          <button className="round-button" onClick={() => go("add-vault")}>
            <Plus />
          </button>
        }
      />
      <div className="hero-vault">
        <small>YOUR MAIN GOAL</small>
        <h2>London Move</h2>
        <b>
          €8,900 <span>/ €15,000</span>
        </b>
        <div>
          <i />
        </div>
        <footer>
          <strong>59% completed</strong>
          <span>On track · Feb 2027</span>
        </footer>
      </div>
      <div className="vault-list">
        {[
          ["New MacBook Pro", "€1,200 / €3,000", 40],
          ["Emergency Fund", "€4,500 / €5,000", 90],
          ["Travel Fund", "£600 / £2,000", 30],
        ].map((x) => (
          <button key={x[0]} onClick={() => toast(`${x[0]} opened`)}>
            <div>
              <b>{x[0]}</b>
              <small>{x[1]}</small>
            </div>
            <i>
              <span style={{ width: x[2] + "%" }} />
            </i>
            <strong>{x[2]}%</strong>
          </button>
        ))}
      </div>
      <Primary onClick={() => toast("Add money sheet opened")}>
        <Plus />
        Add money
      </Primary>
      <Primary secondary onClick={() => go("add-vault")}>
        Create new vault
      </Primary>
    </div>
  );
}
function Investments({ go, toast }) {
  return (
    <div className="screen investments-screen">
      <Header title="Investments" back onBack={() => go("home")} />
      <div className="portfolio-total">
        <small>PORTFOLIO VALUE</small>
        <b>
          €6,420<sup>.80</sup>
        </b>
        <span>+4.8% this year</span>
        <div className="portfolio-line">
          <svg viewBox="0 0 320 80">
            <path d="M0 65 C35 70, 48 42, 82 52 S125 20, 156 34 S205 12, 235 24 S280 4, 320 12" />
          </svg>
        </div>
      </div>
      <div className="invest-actions">
        <button onClick={() => toast("Investment flow opened")}>
          <Plus />
          Invest
        </button>
        <button onClick={() => toast("Withdrawal flow opened")}>
          <Minus />
          Withdraw
        </button>
        <button onClick={() => toast("Fund explorer opened")}>
          <Search />
          Explore funds
        </button>
      </div>
      <div className="holdings">
        {[
          ["Luxury Brands ETF", "€2,400", "+6.2%"],
          ["S&P 500", "€2,100", "+5.1%"],
          ["Green Energy Fund", "€920", "−1.4%"],
          ["Cash Reserve", "€1,000", "Stable"],
        ].map((x, i) => (
          <button onClick={() => toast(`${x[0]} details opened`)} key={x[0]}>
            <i>{["LX", "SP", "GE", "CR"][i]}</i>
            <span>
              <b>{x[0]}</b>
              <small>{x[1]}</small>
            </span>
            <strong className={x[2].startsWith("−") ? "negative" : ""}>
              {x[2]}
            </strong>
          </button>
        ))}
      </div>
      <p className="disclaimer">
        Investments involve risk. Your capital may go up or down.
      </p>
    </div>
  );
}
function Lifestyle({ go, toast }) {
  return (
    <div className="screen lifestyle-screen">
      <Header title="Lifestyle" back onBack={() => go("home")} />
      <p className="screen-lead">Premium benefits curated for Ellis clients.</p>
      {[
        [
          "01",
          "Airport Lounge Access",
          "Available in 1,200+ lounges worldwide",
          "View Pass",
        ],
        [
          "02",
          "Concierge Service",
          "Restaurant bookings, travel help and priority support",
          "Contact Concierge",
        ],
        [
          "03",
          "Luxury Travel Insurance",
          "Coverage for trips up to 90 days",
          "View Coverage",
        ],
        [
          "04",
          "Partner Offers",
          "Private deals from selected fashion, dining and travel brands",
          "Explore Offers",
        ],
      ].map((x, i) => (
        <article className={`benefit benefit-${i}`} key={x[1]}>
          <small>{x[0]} · ELLIS PRIVILEGE</small>
          <h2>{x[1]}</h2>
          <p>{x[2]}</p>
          <button onClick={() => toast(`${x[3]} opened`)}>
            {x[3]} <ArrowRight />
          </button>
        </article>
      ))}
    </div>
  );
}
function Notifications({ go, read, setRead }) {
  const [selected, setSelected] = useState(-1);
  const items = [
    ["Card payment approved", "The Connaught • €186.00 • 2 min ago"],
    ["Transfer completed", "Anna Kowalska received €120.00 • Today"],
    ["Security check", "New login from iPhone 15 Pro • Yesterday"],
    ["Subscription reminder", "Spotify Premium will charge €12.99 on Jul 04"],
  ];
  return (
    <div className="screen">
      <Header
        title="Notifications"
        back
        onBack={() => go("home")}
        right={
          <button className="mark-read" onClick={() => setRead(true)}>
            Mark all read
          </button>
        }
      />
      <div className="notification-list">
        {items.map((x, i) => (
          <button
            className={`${read ? "read" : ""} ${selected === i ? "selected" : ""}`}
            onClick={() => {
              setSelected(i);
              setRead(true);
            }}
            key={x[0]}
          >
            <i>
              {!read && <b />}
              {[CreditCard, Send, ShieldCheck, Bell].map((Icon, j) =>
                i === j ? <Icon key={j} /> : null,
              )}
            </i>
            <span>
              <b>{x[0]}</b>
              <small>{x[1]}</small>
            </span>
            <ChevronRight />
          </button>
        ))}
      </div>
      {selected >= 0 && (
        <div className="notification-detail">
          <small>NOTIFICATION DETAILS</small>
          <b>{items[selected][0]}</b>
          <p>
            {items[selected][1]}. Tap related activity in the app to view the
            full record.
          </p>
          <button onClick={() => setSelected(-1)}>Close</button>
        </div>
      )}
    </div>
  );
}
function Profile({
  go,
  toast,
  openCaseStudy = () => {
    location.hash = "case-study";
    location.reload();
  },
}) {
  return (
    <div className="screen">
      <Header title="Profile" back onBack={() => go("home")} />
      <div className="profile-card">
        <i>YE</i>
        <div>
          <h2>Yana Ellis</h2>
          <b>Private Client</b>
          <span>yana.ellis@email.com</span>
        </div>
      </div>
      <div className="profile-list">
        {[
          ["Personal information", "Details and address"],
          ["Documents", "Statements and tax"],
          ["Account limits", "Daily and monthly"],
          ["Card settings", "Cards and payments"],
          ["Security", "Face ID and devices"],
          ["Notifications", "Alerts and privacy"],
          ["Appearance", "Theme and card style"],
          ["Help", "Private support"],
        ].map((x, i) => (
          <button
            key={x[0]}
            onClick={() =>
              x[0] === "Security"
                ? go("security")
                : x[0] === "Help"
                  ? go("support")
                  : x[0] === "Card settings"
                    ? go("card")
                    : toast(`${x[0]} opened`)
            }
          >
            <i>{i + 1}</i>
            <span>
              <b>{x[0]}</b>
              <small>{x[1]}</small>
            </span>
            <ChevronRight />
          </button>
        ))}
      </div>
      <button className="profile-case" onClick={openCaseStudy}>
        <Sparkles />
        <span>
          <b>UX Case Study</b>
          <small>See the thinking behind Ellis Bank</small>
        </span>
        <ChevronRight />
      </button>
      <Primary secondary onClick={() => go("login")}>
        Log out
      </Primary>
    </div>
  );
}
function Security({ go, toast }) {
  const [face, setFace] = useState(true),
    [pass, setPass] = useState(true),
    [two, setTwo] = useState(true);
  return (
    <div className="screen">
      <Header title="Security" back onBack={() => go("profile")} />
      <div className="security-score">
        <div>
          <ShieldCheck />
        </div>
        <span>
          <small>SECURITY SCORE</small>
          <h2>Excellent</h2>
          <p>Your account is protected with all recommended settings.</p>
        </span>
      </div>
      <div className="settings-group">
        <Toggle label="Face ID" state={face} setState={setFace} />
        <Toggle label="Passcode" state={pass} setState={setPass} />
        <Toggle
          label="Two-factor authentication"
          state={two}
          setState={setTwo}
        />
        <button
          className="setting-link"
          onClick={() => toast("Device management opened")}
        >
          <span>Device management</span>
          <ChevronRight />
        </button>
        <button
          className="setting-link"
          onClick={() => toast("Trusted contacts opened")}
        >
          <span>Trusted contacts</span>
          <ChevronRight />
        </button>
        <button
          className="setting-link"
          onClick={() => toast("Privacy settings opened")}
        >
          <span>Privacy settings</span>
          <ChevronRight />
        </button>
      </div>
      <Primary onClick={() => toast("Passcode change secured")}>
        Change passcode
      </Primary>
      <Primary secondary onClick={() => toast("2 trusted devices")}>
        Manage devices
      </Primary>
      <button
        className="text-action"
        onClick={() => toast("Security activity reviewed · No issues found")}
      >
        Review security activity
      </button>
    </div>
  );
}
function Support({ go }) {
  const [messages, setMessages] = useState([
    ["assistant", "Hi Yana, how can I help today?"],
  ]);
  const [text, setText] = useState("");
  const send = (t) => {
    if (!t.trim()) return;
    setMessages((m) => [
      ...m,
      ["user", t],
      [
        "assistant",
        "I’m on it. A private client specialist can continue from here if you need one.",
      ],
    ]);
    setText("");
  };
  return (
    <div className="screen support-screen">
      <Header
        title="Private Assistant"
        back
        onBack={() => go("profile")}
        eyebrow="AVAILABLE NOW"
      />
      <p className="screen-lead">
        Get help with your account, card, travel benefits or payments.
      </p>
      <div className="chat-thread">
        {messages.map((m, i) => (
          <div className={m[0]} key={i}>
            {m[0] === "assistant" && <i>E</i>}
            <p>{m[1]}</p>
          </div>
        ))}
      </div>
      <div className="chat-quick">
        {[
          "Report a card issue",
          "Ask about a payment",
          "Book concierge request",
          "Contact human support",
        ].map((x) => (
          <button onClick={() => send(x)} key={x}>
            {x}
          </button>
        ))}
      </div>
      <div className="chat-input">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send(text)}
          placeholder="Type your message..."
        />
        <button onClick={() => send(text)} aria-label="Send message">
          <Send />
        </button>
      </div>
    </div>
  );
}

function SimpleFlow({ route, go, data, toast }) {
  const cfg = {
    request: [
      "Request Money",
      "Create a secure link or select a contact to request money.",
      "Requested amount",
    ],
    topup: ["Top Up", "Add money from another bank card.", "Top up amount"],
    exchange: [
      "Currency Exchange",
      "Convert instantly with a clear live rate.",
      "You send",
    ],
    "payment-detail": ["Payment Details", data?.[0] || "London Rent", "Amount"],
    "account-detail": [
      "Account Details",
      data?.[0] || "Main Account",
      "Available balance",
    ],
    "add-account": [
      "New Account",
      "Choose the account that fits what comes next.",
      "Account name",
    ],
    limits: [
      "Card Limits",
      "Set clear boundaries for spending and cash.",
      "Daily limit",
    ],
    transaction: [
      "Transaction Details",
      data?.[0] || "The Connaught",
      "Amount",
    ],
    budget: [
      "Monthly Budget",
      "Set a monthly amount and receive calm progress alerts.",
      "Budget",
    ],
    "add-vault": [
      "Create a Vault",
      "Give your next goal a name and a target.",
      "Goal name",
    ],
    receipt: [
      "Transfer Receipt",
      "Your transfer is complete and documented.",
      "Reference",
    ],
  };
  const c = cfg[route] || [
    "All Transactions",
    "Every payment in one searchable place.",
    "Search",
  ];
  if (route === "all-transactions")
    return (
      <div className="screen">
        <Header
          title="All Transactions"
          back
          onBack={() => go("analytics")}
          right={
            <button className="round-button">
              <Search />
            </button>
          }
        />
        <TransactionList
          items={[
            ...tx,
            ["Salary", "Jun 28 · Income", "+€4,800", "SA"],
            ["Aesop", "Jun 27 · Shopping", "−€92", "AE"],
            ["Eurostar", "Jun 26 · Travel", "−€168", "EU"],
          ]}
        />
        <div className="empty-state">
          <CircleDollarSign />
          <b>No more transactions</b>
          <p>Once you start using your card, new activity will appear here.</p>
        </div>
      </div>
    );
  return (
    <div className="screen simple-flow">
      <Header
        title={c[0]}
        back
        onBack={() => go(route === "payment-detail" ? "payments" : "home")}
      />
      <div className="simple-hero">
        <i>
          <CircleDollarSign />
        </i>
        <h2>{c[1]}</h2>
        {route === "account-detail" && (
          <strong>{data?.[1] || "€12,450.00"}</strong>
        )}
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          toast(`${c[0]} saved`);
          go("home");
        }}
      >
        <label>
          {c[2]}
          <input
            required
            placeholder={route === "exchange" ? "€1,000" : "Enter details"}
          />
        </label>
        {[
          "request",
          "topup",
          "payment-detail",
          "budget",
          "add-vault",
          "limits",
        ].includes(route) && (
          <label>
            Amount
            <input required placeholder="€0.00" />
          </label>
        )}
        <label>
          Note optional
          <input placeholder="Add a note" />
        </label>
        <Primary>
          {route === "receipt" ? "Download receipt" : "Continue"} <ArrowRight />
        </Primary>
      </form>
    </div>
  );
}

export default function BankApp({ openCaseStudy }) {
  const [route, setRoute] = useState("splash"),
    [ob, setOb] = useState(0),
    [color, setColor] = useState(colors[0][1]),
    [frozen, setFrozen] = useState(false),
    [transfer, setTransfer] = useState({}),
    [routeData, setRouteData] = useState(null),
    [toastText, setToastText] = useState(""),
    [read, setRead] = useState(false);
  const viewport = useRef(null);
  const authenticated = !["splash", "onboarding", "login"].includes(route);
  const go = (r, d = null) => {
    setRoute(r);
    setRouteData(d);
    setTimeout(() => {
      if (viewport.current) viewport.current.scrollTop = 0;
    }, 0);
  };
  const toast = (t) => {
    setToastText(t);
    setTimeout(() => setToastText(""), 2800);
  };
  let content;
  if (route === "splash") content = <Splash next={() => go("onboarding")} />;
  else if (route === "onboarding")
    content = (
      <Onboarding index={ob} setIndex={setOb} login={() => go("login")} />
    );
  else if (route === "login") content = <Login unlock={() => go("home")} />;
  else if (route === "home")
    content = <HomeScreen go={go} color={color} frozen={frozen} />;
  else if (route === "accounts") content = <Accounts go={go} />;
  else if (route === "card")
    content = (
      <CardDetails
        go={go}
        color={color}
        frozen={frozen}
        setFrozen={setFrozen}
        toast={toast}
      />
    );
  else if (route === "customize")
    content = (
      <Customize go={go} color={color} setColor={setColor} toast={toast} />
    );
  else if (route === "transfers")
    content = <Transfers go={go} setTransfer={setTransfer} />;
  else if (route === "confirm")
    content = <ConfirmTransfer go={go} transfer={transfer} />;
  else if (route === "transfer-success")
    content = <TransferSuccess go={go} transfer={transfer} />;
  else if (route === "payments") content = <Payments go={go} />;
  else if (route === "analytics") content = <Analytics go={go} />;
  else if (route === "vaults") content = <Vaults go={go} toast={toast} />;
  else if (route === "investments")
    content = <Investments go={go} toast={toast} />;
  else if (route === "lifestyle")
    content = <Lifestyle go={go} toast={toast} />;
  else if (route === "notifications")
    content = <Notifications go={go} read={read} setRead={setRead} />;
  else if (route === "profile") content = <Profile go={go} toast={toast} />;
  else if (route === "security") content = <Security go={go} toast={toast} />;
  else if (route === "support") content = <Support go={go} />;
  else
    content = (
      <SimpleFlow route={route} go={go} data={routeData} toast={toast} />
    );
  return (
    <main className="prototype-page">
      <header className="prototype-bar">
        <div>
          <EBLogo />
          <span>
            <b>Ellis Bank</b>
            <small>Interactive mobile prototype · 393 × 852</small>
          </span>
        </div>
        <nav>
          <button onClick={() => go("splash")}>Restart prototype</button>
          <button className="case-study-button" onClick={openCaseStudy}>
            <Sparkles />
            UX Case Study
          </button>
        </nav>
      </header>
      <aside className="screen-map">
        <span>PROTOTYPE MAP</span>
        {screens.map(([g, list]) => (
          <div key={g}>
            <small>{g}</small>
            {list.map((x) => (
              <button
                className={route === routeMap[x] ? "active" : ""}
                onClick={() => go(routeMap[x])}
                key={x}
              >
                {x}
                <ChevronRight />
              </button>
            ))}
          </div>
        ))}
      </aside>
      <section className="device-stage">
        <div className="device-shadow" />
        <div className="iphone">
          <div className="dynamic-island" />
          <StatusBar />
          <div className="app-viewport" ref={viewport}>
            {content}
          </div>
          {authenticated && <BottomNav route={route} setRoute={go} />}
          {toastText && (
            <div className="app-toast">
              <Check />
              <span>{toastText}</span>
            </div>
          )}
          <div className="home-bar" />
        </div>
        <div className="stage-note">
          <span>CLICK THROUGH THE PROTOTYPE</span>
          <p>
            All primary flows, navigation and product states are interactive.
          </p>
        </div>
      </section>
    </main>
  );
}
