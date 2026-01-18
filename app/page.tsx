
import MainLayout from "@/components/layout/MainLayout";
import Link from "next/link";

export default function Home() {
  return (
    <MainLayout>
      <div className="flex justify-end p-2">
        <Link href="/settings" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded">
          Settings
        </Link>
      </div>
      <div className="bg-[#0b1220] min-h-screen p-4 text-white">

        {/* ===== TWO COLUMN GRID ===== */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">

          {/* ================= LEFT TABLE : ACCOUNT / TRADES ================= */}
          <div className="border border-gray-700 bg-[#111827] rounded-md overflow-hidden">
            <table className="w-full text-[11px] border-collapse">
              <thead className="bg-[#1f2937]">
                <tr>
                  {["STRIKE", "ENTRY", "EXIT", "LOTS", "PRICE", "PTS", "P&L", "TRIG", "S", "B"].map(h => (
                    <th key={h} className="px-2 py-1 text-left font-bold text-gray-300 border-r border-gray-700">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                <tr className="bg-[#020617]">
                  <td className="px-2 py-1 font-bold text-yellow-400">ATM</td>
                  <td className="px-2 py-1">09:15</td>
                  <td className="px-2 py-1">12:30</td>
                  <td className="px-2 py-1">6</td>
                  <td className="px-2 py-1 font-semibold">206.55</td>
                  <td className="px-2 py-1 text-green-400">+9.4</td>
                  <td className="px-2 py-1 text-green-400 font-bold">+3666</td>
                  <td className="px-2 py-1 bg-yellow-700 text-black font-bold">OLD</td>
                  <td className="px-2 py-1 text-center">1</td>
                  <td className="px-2 py-1 text-center">0</td>
                </tr>

                <tr className="border-t border-gray-800">
                  <td className="px-2 py-1 font-bold">OTM1</td>
                  <td className="px-2 py-1">11:40</td>
                  <td className="px-2 py-1">15:10</td>
                  <td className="px-2 py-1">10</td>
                  <td className="px-2 py-1 font-semibold">198.35</td>
                  <td className="px-2 py-1 text-red-400">-43.1</td>
                  <td className="px-2 py-1 text-green-400 font-bold">+28015</td>
                  <td className="px-2 py-1 bg-blue-700 text-white font-bold">UDV</td>
                  <td className="px-2 py-1 text-center">0</td>
                  <td className="px-2 py-1 text-center">1</td>
                </tr>
              </tbody>
            </table>

            {/* ACCOUNT SUMMARY FOOTER */}
            <div className="border-t border-gray-700 bg-[#020617] text-[11px]">
              <div className="grid grid-cols-6 px-2 py-1">
                <span className="text-gray-400">CAPITAL</span>
                <span className="text-green-400 font-bold">₹234831</span>
                <span className="text-gray-400">DAY P&L</span>
                <span className="text-green-400 font-bold">₹31681</span>
                <span />
                <span />
              </div>

              <div className="px-2 py-1 text-gray-500">
                HIST: ₹106925 | ₹-61893 | ₹-7046 | ₹-9445 | ₹28119
              </div>
            </div>
          </div>

          {/* ================= RIGHT TABLE : STRIKE / MARKET ================= */}
          <div className="border border-gray-700 bg-[#020617] rounded-md overflow-hidden">
            <table className="w-full text-[11px] border-collapse">
              <thead className="bg-[#1d4ed8]">
                <tr>
                  {["STRIKE", "OPEN", "LTP", "CHANGE", "LEAD", "REGIME", "IND.REG", "T.MODE", "T.TYPE"].map(h => (
                    <th key={h} className="px-2 py-1 text-left font-bold text-white border-r border-blue-900">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {[
                  ["25700", "263", "192.8", "-70.2", "PE ▼", "BEARISH", "Bullish", "BUY CE", "Buy PE"],
                  ["25800", "218.85", "194.8", "-24.05", "PE ▼", "BEARISH", "NoTrend", "SHORT", "Sell CE"],
                  ["25850", "203", "210.6", "+7.6", "PE ▲", "SHORT COV", "Neutral", "LONG STR", "Buy PE"],
                  ["25900", "195.95", "234.65", "+38.7", "PE ▲", "SHORT COV", "Bearish", "LONG STR", "Buy PE"],
                  ["26000", "203.8", "302.7", "+98.9", "PE ▲", "SHORT COV", "Bearish", "LONG STR", "Buy PE"],
                ].map((r, i) => (
                  <tr
                    key={i}
                    className={`border-b border-gray-800 ${
                      r[0] === "25850" ? "bg-yellow-400 text-black font-bold" : "hover:bg-[#111827]"
                    }`}
                  >
                    <td className="px-2 py-1">{r[0]}</td>
                    <td className="px-2 py-1 text-gray-400">{r[1]}</td>
                    <td className="px-2 py-1 font-bold">{r[2]}</td>
                    <td className={`px-2 py-1 font-bold ${r[3].startsWith("+") ? "text-green-400" : "text-red-400"}`}>
                      {r[3]}
                    </td>
                    <td className="px-2 py-1">{r[4]}</td>
                    <td className="px-2 py-1 bg-red-700 text-white font-bold text-[10px]">{r[5]}</td>
                    <td className="px-2 py-1 text-green-400">{r[6]}</td>
                    <td className="px-2 py-1 text-blue-400 font-semibold">{r[7]}</td>
                    <td className="px-2 py-1 text-green-400 font-semibold">{r[8]}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* INDICATOR FOOTER */}
            <div className="border-t border-gray-700 bg-[#020617] text-[11px] px-2 py-1 flex gap-6">
              <span className="text-red-400 font-bold">ROC -4.1</span>
              <span className="text-white font-bold">RSI 46</span>
              <span className="text-green-400 font-bold">DI 33</span>
              <span className="text-gray-500">+DI 25</span>
              <span className="text-gray-500">CHOP 51</span>
            </div>
          </div>

        </div>
      </div>
    </MainLayout>
  );
}
