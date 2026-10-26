import { CreditCard, Landmark } from "lucide-react";
import { startTopupAction } from "@/app/dashboard/actions";
import { requireUser } from "@/lib/auth";
import { getVirtualAccount } from "@/lib/virtual-account";

export default async function TopupPage() {
  const user = await requireUser();
  const account = await getVirtualAccount(user.sub);

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight">Add money</h1>
        <p className="mt-1 text-sm text-neutral-500">Choose how you want to add Nigerian naira to your wallet.</p>
      </header>

      <section className="rounded-2xl border border-neutral-200 bg-white p-5 dark:border-neutral-800 dark:bg-neutral-900/40 sm:p-6">
        <h2 className="flex items-center gap-2 font-semibold">
          <Landmark size={18} className="text-emerald-600 dark:text-emerald-400" />
          Bank transfer
        </h2>
        {account ? (
          <>
            <dl className="mt-4 divide-y divide-neutral-200 rounded-xl border border-neutral-200 dark:divide-neutral-800 dark:border-neutral-800">
              <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-3">
                <dt className="text-sm text-neutral-500">Bank</dt>
                <dd className="text-sm font-medium">{account.bankName}</dd>
              </div>
              <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-3">
                <dt className="text-sm text-neutral-500">Account number</dt>
                <dd className="font-mono text-base font-semibold">{account.accountNumber}</dd>
              </div>
              <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-3">
                <dt className="text-sm text-neutral-500">Account name</dt>
                <dd className="text-sm font-medium">{account.accountName}</dd>
              </div>
            </dl>
            <p className="mt-3 text-sm text-neutral-500">Transfers to this account are added to your wallet automatically.</p>
          </>
        ) : (
          <p role="status" className="mt-4 rounded-lg border border-amber-500/40 bg-amber-500/10 p-3 text-sm">
            Your dedicated bank account is not available yet. Please try again shortly or add money online below.
          </p>
        )}
      </section>

      <section className="rounded-2xl border border-neutral-200 bg-white p-5 dark:border-neutral-800 dark:bg-neutral-900/40 sm:p-6">
        <h2 className="flex items-center gap-2 font-semibold">
          <CreditCard size={18} className="text-emerald-600 dark:text-emerald-400" />
          Pay online
        </h2>
        <p className="mt-1 text-sm text-neutral-500">Pay securely through Spurs Pay.</p>
        <form action={startTopupAction} className="mt-4 space-y-4">
          <input type="hidden" name="asset" value="NGN" />
          <div>
            <label htmlFor="amount" className="mb-1.5 block text-sm font-medium">Amount (NGN)</label>
            <input
              id="amount"
              name="amount"
              inputMode="decimal"
              required
              placeholder="0.00"
              className="h-11 w-full rounded-lg border border-neutral-300 bg-white px-3 text-sm outline-none focus:border-emerald-500 dark:border-neutral-700 dark:bg-neutral-950"
            />
          </div>
          <button
            type="submit"
            className="flex h-11 w-full items-center justify-center rounded-lg bg-emerald-600 px-4 text-sm font-medium text-white transition hover:bg-emerald-700"
          >
            Continue to payment
          </button>
        </form>
      </section>
    </div>
  );
}
