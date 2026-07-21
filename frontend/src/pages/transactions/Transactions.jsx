import { useEffect, useMemo, useState } from "react";
import {
  toast,
} from "sonner";
import DashboardLayout from "../../layouts/DashboardLayout";
import API from "../../api/axios";

function Transactions() {
  const [transactions, setTransactions] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  const [showDrawer, setShowDrawer] =
    useState(false);

  const [showDeleteModal,
    setShowDeleteModal] =
    useState(false);

  const [selectedTransaction,
    setSelectedTransaction] =
    useState(null);

  const [editingId, setEditingId] =
    useState(null);

  const [formData, setFormData] =
    useState({
      title: "",
      transactionType: "income",
      category: "",
      subCategory: "",
      amount: "",

      customerVendor: "",
      customerEmail: "",
      customerPhone: "",

      invoiceNumber: "",

      paymentMethod: "cash",
      paymentReference: "",

      region: "",
      city: "",
      country: "",

      itemName: "",
      quantity: 1,
      unitPrice: 0,

      description: "",
      notes: "",

      transactionDate:
        new Date()
          .toISOString()
          .split("T")[0],
    });

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions =
    async () => {
      try {
        const userInfo =
          JSON.parse(
            localStorage.getItem(
              "userInfo"
            )
          );

        const workspace =
          JSON.parse(
            localStorage.getItem(
              "activeWorkspace"
            )
          );

        if (!workspace) {
          setLoading(false);
          return;
        }

        const { data } =
          await API.get(
            `/transactions?workspaceId=${workspace._id}`,
            {
              headers: {
                Authorization: `Bearer ${userInfo.token}`,
              },
            }
          );

        setTransactions(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const resetForm = () => {
    setEditingId(null);

    setFormData({
      title: "",
      transactionType: "income",
      category: "",
      subCategory: "",
      amount: "",

      customerVendor: "",
      customerEmail: "",
      customerPhone: "",

      invoiceNumber: "",

      paymentMethod: "cash",
      paymentReference: "",

      region: "",
      city: "",
      country: "",

      itemName: "",
      quantity: 1,
      unitPrice: 0,

      description: "",
      notes: "",

      transactionDate:
        new Date()
          .toISOString()
          .split("T")[0],
    });
  };

  const createTransaction =
    async () => {
      try {
        const userInfo =
          JSON.parse(
            localStorage.getItem(
              "userInfo"
            )
          );

        const workspace =
          JSON.parse(
            localStorage.getItem(
              "activeWorkspace"
            )
          );

        if (editingId) {
          await API.put(
            `/transactions/${editingId}`,
            formData,
            {
              headers: {
                Authorization: `Bearer ${userInfo.token}`,
              },
            }
          );
        } else {
          await API.post(
            "/transactions",
            {
              ...formData,
              workspaceId:
                workspace._id,
            },
            {
              headers: {
                Authorization: `Bearer ${userInfo.token}`,
              },
            }
          );
        }

        setShowDrawer(false);

        resetForm();

        fetchTransactions();

        toast.success(
          "Transaction updated successfully"
        );

      } catch (error) {
        console.error(error);
        toast.error("Failed to save transaction");
      }
    };

  const handleEditTransaction = (
    transaction
  ) => {
    setEditingId(
      transaction._id
    );

    setFormData({
      ...transaction,
      transactionDate:
        transaction.transactionDate
          ?.split("T")[0],
    });

    setShowDrawer(true);
  };

  const confirmDeleteTransaction =
    async () => {

      try {

        const userInfo =
          JSON.parse(
            localStorage.getItem(
              "userInfo"
            )
          );

        await API.delete(
          `/transactions/${selectedTransaction._id}`,
          {
            headers: {
              Authorization:
                `Bearer ${userInfo.token}`,
            },
          }
        );

        setShowDeleteModal(false);

        setSelectedTransaction(null);

        fetchTransactions();

        toast.success(
          "Transaction deleted successfully"
        );
        setShowDeleteModal(false);
        setSelectedTransaction(null);

      } catch (error) {

        console.error(error);

        toast.error("Failed to delete transaction");
      }
    };

  const revenue = useMemo(() => {
    return transactions
      .filter((t) =>
        ["income", "subscription"].includes(
          t.transactionType
        )
      )
      .reduce(
        (sum, t) =>
          sum + Number(t.amount),
        0
      );
  }, [transactions]);

  const expenses = useMemo(() => {
    return transactions
      .filter((t) =>
        [
          "expense",
          "purchase",
          "salary",
          "tax",
        ].includes(
          t.transactionType
        )
      )
      .reduce(
        (sum, t) =>
          sum + Number(t.amount),
        0
      );
  }, [transactions]);

  const profit =
    revenue - expenses;

  const filteredTransactions =
    transactions.filter(
      (transaction) =>
        transaction.title
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||
        transaction.category
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||
        transaction.customerVendor
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          )
    );
  if (loading) {
    return (
      <DashboardLayout>
        <div className="p-6">
          Loading Transactions...
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>

      {showDeleteModal && (

        <div
          onClick={() => {
            setShowDeleteModal(false);
            setSelectedTransaction(null);
          }}
          className="
      fixed
      inset-0
      bg-black/70
      backdrop-blur-sm
      flex
      items-center
      justify-center
      z-[100]
    "
        >

          <div
            onClick={(e) =>
              e.stopPropagation()
            }
            className="
        bg-zinc-950
        border
        border-zinc-800
        rounded-2xl
        p-8
        w-full
        max-w-md
        shadow-2xl
      "
          >

            <div className="mb-6">

              <div
                className="
            w-14
            h-14
            rounded-full
            bg-red-500/10
            flex
            items-center
            justify-center
            mb-4
          "
              >
                <span className="text-2xl">
                  ⚠️
                </span>
              </div>

              <h2
                className="
            text-2xl
            font-bold
            mb-3
          "
              >
                Delete Transaction
              </h2>

              <p className="text-zinc-400">
                You are about to permanently
                delete this transaction.
              </p>

            </div>

            <div
              className="
          bg-zinc-900
          rounded-xl
          p-4
          mb-6
        "
            >

              <p className="font-medium">
                {selectedTransaction?.title}
              </p>

              <p className="text-zinc-500 text-sm mt-1">
                ₹
                {Number(
                  selectedTransaction?.amount || 0
                ).toLocaleString()}
              </p>

            </div>

            <p
              className="
          text-sm
          text-zinc-500
          mb-6
        "
            >
              This action cannot be undone
              and may affect historical
              reporting and analytics.
            </p>

            <div
              className="
          flex
          justify-end
          gap-3
        "
            >

              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setSelectedTransaction(
                    null
                  );
                }}
                className="
            px-4
            py-2
            bg-zinc-800
            hover:bg-zinc-700
            rounded-xl
          "
              >
                Cancel
              </button>

              <button
                onClick={
                  confirmDeleteTransaction
                }
                className="
            px-4
            py-2
            bg-red-600
            hover:bg-red-500
            rounded-xl
            font-medium
          "
              >
                Delete Permanently
              </button>

            </div>

          </div>

        </div>

      )
      }

      <div className="flex justify-between items-center mb-8">

        <div>
          <h1 className="text-4xl font-bold">
            Transactions
          </h1>

          <p className="text-zinc-500 mt-2">
            Manage business transactions.
          </p>
        </div>

        <button
          onClick={() => {
            resetForm();
            setShowDrawer(true);
          }}
          className="
          px-5
          py-3
          bg-violet-700
          hover:bg-violet-600
          rounded-xl
        "
        >
          + Add Transaction
        </button>

      </div>

      {/* KPI Cards */}

      <div
        className="
          grid
          grid-cols-1
          md:grid-cols-2
          xl:grid-cols-4
          gap-6
          mb-8
        "
      >

        <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-6">
          <p className="text-zinc-500">
            Revenue
          </p>

          <h2 className="text-3xl font-bold mt-3">
            ₹
            {revenue.toLocaleString()}
          </h2>
        </div>

        <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-6">
          <p className="text-zinc-500">
            Expenses
          </p>

          <h2 className="text-3xl font-bold mt-3">
            ₹
            {expenses.toLocaleString()}
          </h2>
        </div>

        <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-6">
          <p className="text-zinc-500">
            Profit
          </p>

          <h2 className="text-3xl font-bold mt-3">
            ₹
            {profit.toLocaleString()}
          </h2>
        </div>

        <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-6">
          <p className="text-zinc-500">
            Transactions
          </p>

          <h2 className="text-3xl font-bold mt-3">
            {transactions.length}
          </h2>
        </div>

      </div>

      {/* Search */}

      <div className="mb-6">

        <input
          type="text"
          placeholder="Search transactions..."
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
          className="
            w-full
            p-3
            bg-zinc-950
            border
            border-zinc-800
            rounded-xl
          "
        />

      </div>

      {/* Table */}

      <div
        className="
          bg-zinc-950
          border
          border-zinc-800
          rounded-2xl
          overflow-x-auto
        "
      >

        <table className="w-full">

          <thead>

            <tr className="border-b border-zinc-800">

              <th className="p-4 text-left">
                Title
              </th>

              <th className="p-4 text-left">
                Type
              </th>

              <th className="p-4 text-left">
                Category
              </th>

              <th className="p-4 text-left">
                Customer
              </th>

              <th className="p-4 text-left">
                Amount
              </th>

              <th className="p-4 text-left">
                Date
              </th>

              <th className="p-4 text-left">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {filteredTransactions.map(
              (transaction) => (
                <tr
                  key={
                    transaction._id
                  }
                  className="
                    border-b
                    border-zinc-900
                  "
                >

                  <td className="p-4">
                    {
                      transaction.title
                    }
                  </td>

                  <td className="p-4 capitalize">
                    {
                      transaction.transactionType
                    }
                  </td>

                  <td className="p-4">
                    {
                      transaction.category
                    }
                  </td>

                  <td className="p-4">
                    {transaction.customerVendor ||
                      "-"}
                  </td>

                  <td className="p-4">
                    ₹
                    {Number(
                      transaction.amount
                    ).toLocaleString()}
                  </td>

                  <td className="p-4">
                    {new Date(
                      transaction.transactionDate
                    ).toLocaleDateString()}
                  </td>

                  <td className="p-4">

                    <div className="flex gap-3">

                      <button
                        onClick={() =>
                          handleEditTransaction(
                            transaction
                          )
                        }
                        className="
                          text-blue-500
                          hover:text-blue-400
                        "
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => {
                          console.log("DELETE CLICKED");

                          setSelectedTransaction(
                            transaction
                          );

                          setShowDeleteModal(true);
                        }}
                        className="
    text-red-500
    hover:text-red-400
  "
                      >
                        Delete
                      </button>

                    </div>

                  </td>

                </tr>
              )
            )}

          </tbody>

        </table>

      </div>

      {showDrawer && (
        <div
          onClick={() => {
            setShowDrawer(false);
            resetForm();
          }}
          className="
            fixed
            inset-0
            bg-black/60
            flex
            justify-end
            z-50
          "
        >
          <div
            onClick={(e) =>
              e.stopPropagation()
            }
            className="
              w-full
              max-w-2xl
              h-screen
              overflow-y-auto
              bg-zinc-950
              border-l
              border-zinc-800
              p-6
            "
          >
            <div className="flex justify-between items-center mb-6">

              <h2 className="text-2xl font-bold">
                {editingId
                  ? "Edit Transaction"
                  : "Create Transaction"}
              </h2>

              <button
                onClick={() => {
                  setShowDrawer(false);
                  resetForm();
                }}
                className="text-zinc-400"
              >
                ✕
              </button>

            </div>

            <div className="space-y-6">

              {/* Transaction */}

              <div>
                <h3 className="font-semibold mb-3">
                  Transaction Details
                </h3>

                <div className="grid grid-cols-2 gap-4">

                  <input
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Title"
                    className="p-3 bg-zinc-900 rounded-xl"
                  />

                  <select
                    name="transactionType"
                    value={formData.transactionType}
                    onChange={handleChange}
                    className="p-3 bg-zinc-900 rounded-xl"
                  >
                    <option value="income">
                      Income
                    </option>

                    <option value="expense">
                      Expense
                    </option>

                    <option value="purchase">
                      Purchase
                    </option>

                    <option value="investment">
                      Investment
                    </option>

                    <option value="salary">
                      Salary
                    </option>

                    <option value="tax">
                      Tax
                    </option>

                  </select>

                  <input
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    placeholder="Category"
                    className="p-3 bg-zinc-900 rounded-xl"
                  />

                  <input
                    name="subCategory"
                    value={formData.subCategory}
                    onChange={handleChange}
                    placeholder="Sub Category"
                    className="p-3 bg-zinc-900 rounded-xl"
                  />

                  <input
                    type="number"
                    name="amount"
                    value={formData.amount}
                    onChange={handleChange}
                    placeholder="Amount"
                    className="p-3 bg-zinc-900 rounded-xl"
                  />

                  <input
                    type="date"
                    name="transactionDate"
                    value={formData.transactionDate}
                    onChange={handleChange}
                    className="p-3 bg-zinc-900 rounded-xl"
                  />

                </div>
              </div>

              {/* Customer */}

              <div>
                <h3 className="font-semibold mb-3">
                  Customer
                </h3>

                <div className="grid grid-cols-2 gap-4">

                  <input
                    name="customerVendor"
                    value={formData.customerVendor}
                    onChange={handleChange}
                    placeholder="Customer / Vendor"
                    className="p-3 bg-zinc-900 rounded-xl"
                  />

                  <input
                    name="invoiceNumber"
                    value={formData.invoiceNumber}
                    onChange={handleChange}
                    placeholder="Invoice Number"
                    className="p-3 bg-zinc-900 rounded-xl"
                  />

                  <input
                    name="customerEmail"
                    value={formData.customerEmail}
                    onChange={handleChange}
                    placeholder="Email"
                    className="p-3 bg-zinc-900 rounded-xl"
                  />

                  <input
                    name="customerPhone"
                    value={formData.customerPhone}
                    onChange={handleChange}
                    placeholder="Phone"
                    className="p-3 bg-zinc-900 rounded-xl"
                  />

                </div>
              </div>

              {/* Payment */}

              <div>
                <h3 className="font-semibold mb-3">
                  Payment
                </h3>

                <div className="grid grid-cols-2 gap-4">

                  <select
                    name="paymentMethod"
                    value={formData.paymentMethod}
                    onChange={handleChange}
                    className="p-3 bg-zinc-900 rounded-xl"
                  >
                    <option value="cash">
                      Cash
                    </option>

                    <option value="upi">
                      UPI
                    </option>

                    <option value="bank_transfer">
                      Bank Transfer
                    </option>

                    <option value="credit_card">
                      Credit Card
                    </option>
                  </select>

                  <input
                    name="paymentReference"
                    value={formData.paymentReference}
                    onChange={handleChange}
                    placeholder="Payment Reference"
                    className="p-3 bg-zinc-900 rounded-xl"
                  />

                </div>
              </div>

              {/* Location */}

              <div>
                <h3 className="font-semibold mb-3">
                  Location
                </h3>

                <div className="grid grid-cols-3 gap-4">

                  <input
                    name="region"
                    value={formData.region}
                    onChange={handleChange}
                    placeholder="Region"
                    className="p-3 bg-zinc-900 rounded-xl"
                  />

                  <input
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="City"
                    className="p-3 bg-zinc-900 rounded-xl"
                  />

                  <input
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    placeholder="Country"
                    className="p-3 bg-zinc-900 rounded-xl"
                  />

                </div>
              </div>

              {/* Product */}

              <div>
                <h3 className="font-semibold mb-3">
                  Product
                </h3>

                <div className="grid grid-cols-3 gap-4">

                  <input
                    name="itemName"
                    value={formData.itemName}
                    onChange={handleChange}
                    placeholder="Item Name"
                    className="p-3 bg-zinc-900 rounded-xl"
                  />

                  <input
                    type="number"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleChange}
                    placeholder="Quantity"
                    className="p-3 bg-zinc-900 rounded-xl"
                  />

                  <input
                    type="number"
                    name="unitPrice"
                    value={formData.unitPrice}
                    onChange={handleChange}
                    placeholder="Unit Price"
                    className="p-3 bg-zinc-900 rounded-xl"
                  />

                </div>
              </div>

              {/* Notes */}

              <div>

                <textarea
                  rows="3"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Description"
                  className="
                    w-full
                    p-3
                    bg-zinc-900
                    rounded-xl
                  "
                />

                <textarea
                  rows="3"
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  placeholder="Notes"
                  className="
                    w-full
                    p-3
                    bg-zinc-900
                    rounded-xl
                    mt-4
                  "
                />

              </div>

              <button
                onClick={createTransaction}
                className="
                  w-full
                  py-3
                  bg-violet-700
                  hover:bg-violet-600
                  rounded-xl
                  font-medium
                "
              >
                {editingId
                  ? "Update Transaction"
                  : "Create Transaction"}
              </button>

            </div>
          </div>
        </div>
      )
      }
    </DashboardLayout >
  );
}

export default Transactions;