'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DollarSign, Percent, Calendar, TrendingUp, ArrowRight, Building2 } from 'lucide-react';
import Image from 'next/image';

// Finance companies data
const FINANCE_COMPANIES = [
  {
    id: 'bajaj',
    name: 'Bajaj Auto Finance',
    logo: '/images/finance/bajaj.svg',
    interestRates: {
      min: 9.0,
      max: 13.5,
      default: 10.0,
    },
    processingFee: '2% of loan amount',
    maxTenure: 60,
    minLoanAmount: 50000,
    maxLoanAmount: 500000,
  },
  {
    id: 'hdfc',
    name: 'HDFC Bank',
    logo: '/images/finance/hdfc.svg',
    interestRates: {
      min: 8.5,
      max: 12.5,
      default: 9.5,
    },
    processingFee: '1% of loan amount',
    maxTenure: 60,
    minLoanAmount: 50000,
    maxLoanAmount: 500000,
  },
  {
    id: 'icici',
    name: 'ICICI Bank',
    logo: '/images/finance/icici.svg',
    interestRates: {
      min: 8.75,
      max: 13.0,
      default: 9.75,
    },
    processingFee: '1.5% of loan amount',
    maxTenure: 60,
    minLoanAmount: 50000,
    maxLoanAmount: 500000,
  },
  {
    id: 'hero',
    name: 'Hero FinCorp',
    logo: '/images/finance/hero.svg',
    interestRates: {
      min: 8.25,
      max: 12.0,
      default: 9.0,
    },
    processingFee: '1.2% of loan amount',
    maxTenure: 60,
    minLoanAmount: 50000,
    maxLoanAmount: 500000,
  },
  {
    id: 'chola',
    name: 'Cholamandalam Finance',
    logo: '/images/finance/chola.svg',
    interestRates: {
      min: 9.25,
      max: 13.75,
      default: 10.25,
    },
    processingFee: '1.75% of loan amount',
    maxTenure: 60,
    minLoanAmount: 50000,
    maxLoanAmount: 500000,
  },
  {
    id: 'shriram',
    name: 'Shriram City Union Finance',
    logo: '/images/finance/shriram.svg',
    interestRates: {
      min: 9.5,
      max: 14.0,
      default: 10.5,
    },
    processingFee: '2% of loan amount',
    maxTenure: 60,
    minLoanAmount: 50000,
    maxLoanAmount: 500000,
  },
  {
    id: 'ltfinance',
    name: 'L&T Finance',
    logo: '/images/finance/lt.svg',
    interestRates: {
      min: 9.15,
      max: 13.25,
      default: 10.15,
    },
    processingFee: '1.8% of loan amount',
    maxTenure: 60,
    minLoanAmount: 50000,
    maxLoanAmount: 500000,
  },
  {
    id: 'indusind',
    name: 'IndusInd Bank',
    logo: '/images/finance/indusind.svg',
    interestRates: {
      min: 8.8,
      max: 12.75,
      default: 9.8,
    },
    processingFee: '1.25% of loan amount',
    maxTenure: 60,
    minLoanAmount: 50000,
    maxLoanAmount: 500000,
  },
  {
    id: 'idfc',
    name: 'IDFC FIRST Bank',
    logo: '/images/finance/idfc.svg',
    interestRates: {
      min: 8.9,
      max: 12.9,
      default: 9.9,
    },
    processingFee: '1.5% of loan amount',
    maxTenure: 60,
    minLoanAmount: 50000,
    maxLoanAmount: 500000,
  },
  {
    id: 'kotak',
    name: 'Kotak Mahindra Bank',
    logo: '/images/finance/kotak.svg',
    interestRates: {
      min: 8.85,
      max: 12.85,
      default: 9.85,
    },
    processingFee: '1.4% of loan amount',
    maxTenure: 60,
    minLoanAmount: 50000,
    maxLoanAmount: 500000,
  },
];

export default function FinanceCalculatorPage() {
  const [selectedCompany, setSelectedCompany] = useState(FINANCE_COMPANIES[0]);
  const [loanAmount, setLoanAmount] = useState(50000);
  const [interestRate, setInterestRate] = useState(FINANCE_COMPANIES[0].interestRates.default);
  const [tenure, setTenure] = useState(12);
  const [emi, setEmi] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [totalPayment, setTotalPayment] = useState(0);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    setInterestRate(selectedCompany.interestRates.default);
    setLoanAmount(
      Math.max(selectedCompany.minLoanAmount, Math.min(loanAmount, selectedCompany.maxLoanAmount))
    );
    setTenure(Math.min(tenure, selectedCompany.maxTenure));
    calculateEMI();
  }, [selectedCompany]);

  useEffect(() => {
    calculateEMI();
  }, [loanAmount, interestRate, tenure]);

  const calculateEMI = () => {
    const monthlyRate = interestRate / 12 / 100;
    const emi =
      (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, tenure)) /
      (Math.pow(1 + monthlyRate, tenure) - 1);
    const totalPayment = emi * tenure;
    const totalInterest = totalPayment - loanAmount;

    setEmi(Math.round(emi));
    setTotalPayment(Math.round(totalPayment));
    setTotalInterest(Math.round(totalInterest));
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 sm:py-12">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8 sm:mb-12"
        >
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
            Finance Calculator
          </h1>
          <p className="text-gray-600 text-sm sm:text-base max-w-3xl mx-auto">
            Calculate your monthly EMI and plan your bike purchase with our easy-to-use finance
            calculator.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Calculator Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-lg shadow-md p-6 sm:p-8"
          >
            <h2 className="text-xl sm:text-2xl font-bold mb-6">Calculate Your EMI</h2>

            {/* Finance Company Selection */}
            <div className="mb-6">
              <label className="text-sm sm:text-base font-medium text-gray-700 mb-2 block">
                Select Finance Company
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {FINANCE_COMPANIES.map(company => (
                  <button
                    key={company.id}
                    onClick={() => setSelectedCompany(company)}
                    className={`p-3 rounded-lg border ${
                      selectedCompany.id === company.id
                        ? 'border-[var(--primary)] bg-[var(--primary)] text-white'
                        : 'border-gray-200 hover:border-[var(--primary)]'
                    }`}
                  >
                    <div className="flex items-center justify-center gap-2">
                      <Building2 className="h-4 w-4" />
                      <span className="text-sm font-medium">{company.name}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Loan Amount */}
            <div className="mb-6">
              <label className="text-sm sm:text-base font-medium text-gray-700 mb-2 block">
                  Loan Amount
                </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                  type="number"
                  value={loanAmount}
                  onChange={e => setLoanAmount(Number(e.target.value))}
                min={selectedCompany.minLoanAmount}
                max={selectedCompany.maxLoanAmount}
                  step={1000}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Min: {formatCurrency(selectedCompany.minLoanAmount)} | Max:{' '}
                {formatCurrency(selectedCompany.maxLoanAmount)}
              </p>
            </div>

            {/* Interest Rate */}
            <div className="mb-6">
              <label className="text-sm sm:text-base font-medium text-gray-700 mb-2 block">
                Interest Rate (%)
                </label>
              <div className="relative">
                <Percent className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                  type="number"
                  value={interestRate}
                  onChange={e => setInterestRate(Number(e.target.value))}
                min={selectedCompany.interestRates.min}
                max={selectedCompany.interestRates.max}
                  step={0.1}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Min: {selectedCompany.interestRates.min}% | Max: {selectedCompany.interestRates.max}%
              </p>
            </div>

            {/* Loan Tenure */}
            <div className="mb-6">
              <label className="text-sm sm:text-base font-medium text-gray-700 mb-2 block">
                Loan Tenure (Months)
                </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                  type="number"
                value={tenure}
                onChange={e => setTenure(Number(e.target.value))}
                  min={3}
                  max={selectedCompany.maxTenure}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
              />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Min: 3 months | Max: {selectedCompany.maxTenure} months
              </p>
            </div>

            {/* Calculate Button */}
            <button
              onClick={() => setShowResults(true)}
              className="w-full btn-primary text-sm sm:text-base"
            >
              Calculate EMI
            </button>
          </motion.div>

          {/* Results */}
          <AnimatePresence>
            {showResults && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-lg shadow-md p-6 sm:p-8"
              >
                <h2 className="text-xl sm:text-2xl font-bold mb-6">Loan Summary</h2>

                <div className="space-y-6">
                  {/* Monthly EMI */}
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">Monthly EMI</span>
                      <TrendingUp className="text-[var(--primary)]" />
                      </div>
                    <div className="text-2xl font-bold text-[var(--primary)]">
                        {formatCurrency(emi)}
                    </div>
                      </div>

                  {/* Total Interest */}
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">Total Interest</span>
                      <Percent className="text-[var(--primary)]" />
                    </div>
                    <div className="text-2xl font-bold">{formatCurrency(totalInterest)}</div>
                      </div>

                  {/* Total Payment */}
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">Total Payment</span>
                      <DollarSign className="text-[var(--primary)]" />
                    </div>
                    <div className="text-2xl font-bold">{formatCurrency(totalPayment)}</div>
                      </div>

                  {/* Processing Fee */}
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">Processing Fee</span>
                      <ArrowRight className="text-[var(--primary)]" />
                    </div>
                    <div className="text-lg font-medium">{selectedCompany.processingFee}</div>
                  </div>
                </div>

                <div className="mt-6 text-sm text-gray-500">
                  * The above calculations are approximate and may vary based on the actual terms and
                  conditions of the finance company.
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
