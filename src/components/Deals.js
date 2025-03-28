import React from "react";
import "../styles/Deals.css";
import Sidebar from "./Sidebar"; // Import Sidebar component

const Deals = () => {
  // Hard-coded existing deals
  const deals = [
    {
      id: 1,
      name: "50% Off on Fresh Produce",
      store: "FreshMart",
      details:
        "Get 50% off on all fresh fruits and vegetables. Limited time offer.",
      storeUrl: "https://www.freshmart.ca/deals",
    },
    {
      id: 2,
      name: "Buy 1 Get 1 Free on Snacks",
      store: "Snack Haven",
      details: "Buy 1 pack of snacks and get another free. While stocks last.",
      storeUrl: "https://www.snackhaven.ca/deals",
    },
    {
      id: 3,
      name: "10% Off All Organic Products",
      store: "GreenGrocer",
      details:
        "Enjoy 10% off all organic groceries. Offer valid until the end of the month.",
      storeUrl: "https://www.greengrocer.ca/deals",
    },
    {
      id: 1,
      name: "50% Off on Fresh Produce",
      store: "FreshMart",
      details:
        "Get 50% off on all fresh fruits and vegetables. Limited time offer.",
      storeUrl: "https://www.freshmart.ca/deals",
    },
    {
      id: 2,
      name: "Buy 1 Get 1 Free on Snacks",
      store: "Snack Haven",
      details: "Buy 1 pack of snacks and get another free. While stocks last.",
      storeUrl: "https://www.snackhaven.ca/deals",
    },
    {
      id: 3,
      name: "10% Off All Organic Products",
      store: "GreenGrocer",
      details:
        "Enjoy 10% off all organic groceries. Offer valid until the end of the month.",
      storeUrl: "https://www.greengrocer.ca/deals",
    },
    {
      id: 1,
      name: "50% Off on Fresh Produce",
      store: "FreshMart",
      details:
        "Get 50% off on all fresh fruits and vegetables. Limited time offer.",
      storeUrl: "https://www.freshmart.ca/deals",
    },
    {
      id: 2,
      name: "Buy 1 Get 1 Free on Snacks",
      store: "Snack Haven",
      details: "Buy 1 pack of snacks and get another free. While stocks last.",
      storeUrl: "https://www.snackhaven.ca/deals",
    },
    {
      id: 3,
      name: "10% Off All Organic Products",
      store: "GreenGrocer",
      details:
        "Enjoy 10% off all organic groceries. Offer valid until the end of the month.",
      storeUrl: "https://www.greengrocer.ca/deals",
    },
    {
      id: 1,
      name: "50% Off on Fresh Produce",
      store: "FreshMart",
      details:
        "Get 50% off on all fresh fruits and vegetables. Limited time offer.",
      storeUrl: "https://www.freshmart.ca/deals",
    },
    {
      id: 2,
      name: "Buy 1 Get 1 Free on Snacks",
      store: "Snack Haven",
      details: "Buy 1 pack of snacks and get another free. While stocks last.",
      storeUrl: "https://www.snackhaven.ca/deals",
    },
    {
      id: 3,
      name: "10% Off All Organic Products",
      store: "GreenGrocer",
      details:
        "Enjoy 10% off all organic groceries. Offer valid until the end of the month.",
      storeUrl: "https://www.greengrocer.ca/deals",
    },
    {
      id: 1,
      name: "50% Off on Fresh Produce",
      store: "FreshMart",
      details:
        "Get 50% off on all fresh fruits and vegetables. Limited time offer.",
      storeUrl: "https://www.freshmart.ca/deals",
    },
    {
      id: 2,
      name: "Buy 1 Get 1 Free on Snacks",
      store: "Snack Haven",
      details: "Buy 1 pack of snacks and get another free. While stocks last.",
      storeUrl: "https://www.snackhaven.ca/deals",
    },
    {
      id: 3,
      name: "10% Off All Organic Products",
      store: "GreenGrocer",
      details:
        "Enjoy 10% off all organic groceries. Offer valid until the end of the month.",
      storeUrl: "https://www.greengrocer.ca/deals",
    },
    // Add more deals as needed
  ];

  return (
    <div className="page-container">
      {/* Sidebar */}
      <Sidebar />

      <div className="deals-container">
        <h1>Ontario Supermarket Deals & Vouchers</h1>

        {/* Display the deals in grid format */}
        <div className="deal-grid">
          {deals.length === 0 ? (
            <p>No deals available at the moment.</p>
          ) : (
            <div className="grid-container">
              {deals.map((deal) => (
                <div className="deal-card" key={deal.id}>
                  <h3>{deal.name}</h3>
                  <p>
                    <strong>Store:</strong> {deal.store}
                  </p>
                  <p>{deal.details}</p>
                  <a
                    href={deal.storeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <button>Visit Store Deals</button>
                  </a>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Deals;
