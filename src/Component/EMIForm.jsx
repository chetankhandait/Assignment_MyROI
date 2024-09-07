// src/components/EMIForm.js
import React from 'react';
import { useForm } from 'react-hook-form';

const EMIForm = ({ setResults }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      loanAmount: '',
      interestRate: '',
      loanTenure: '',
      prepayment: '',
      tenureType: 'months',
    },
  });

  const onSubmit = (data) => {
    const principal = parseFloat(data.loanAmount);
    const annualInterestRate = parseFloat(data.interestRate);
    const tenure =
      data.tenureType === 'years'
        ? parseFloat(data.loanTenure) * 12
        : parseFloat(data.loanTenure);
    const prepaymentAmount = parseFloat(data.prepayment) || 0;

    // Calculate EMI
    const monthlyInterestRate = annualInterestRate / (12 * 100);
    const emi =
      (principal *
        monthlyInterestRate *
        Math.pow(1 + monthlyInterestRate, tenure)) /
      (Math.pow(1 + monthlyInterestRate, tenure) - 1);

    // Total Payment and Interest
    const totalPayment = emi * tenure;
    const totalInterest = totalPayment - principal;

    // Handling Prepayment
    let adjustedTenure = tenure;
    let totalInterestSaved = 0;

    if (prepaymentAmount > 0) {
      let remainingPrincipal = principal;
      let month = 0;
      while (remainingPrincipal > 0 && month < tenure) {
        const interestForMonth = remainingPrincipal * monthlyInterestRate;
        const principalForMonth = emi - interestForMonth;
        remainingPrincipal -= principalForMonth + prepaymentAmount;
        totalInterestSaved += interestForMonth;
        month++;
        if (remainingPrincipal <= 0) break;
      }
      adjustedTenure = month;
    }

    // Generate Breakdown
    const breakdown = [];
    let balance = principal;
    let totalInterestCalculated = 0;

    for (let i = 1; i <= tenure; i++) {
      const interest = balance * monthlyInterestRate;
      const principalPaid = emi - interest;
      balance -= principalPaid;

      // Apply prepayment
      if (prepaymentAmount > 0) {
        balance -= prepaymentAmount;
      }

      totalInterestCalculated += interest;

      breakdown.push({
        month: i,
        emi: emi.toFixed(2),
        interest: interest.toFixed(2),
        principal: principalPaid.toFixed(2),
        prepayment: prepaymentAmount > 0 ? prepaymentAmount.toFixed(2) : '0.00',
        balance: balance > 0 ? balance.toFixed(2) : '0.00',
      });

      if (balance <= 0) break;
    }

    setResults({
      emi: emi.toFixed(2),
      totalInterest: totalInterestCalculated.toFixed(2),
      totalPayment: (principal + totalInterestCalculated).toFixed(2),
      adjustedTenure: adjustedTenure,
      totalInterestSaved: (totalInterest - totalInterestCalculated).toFixed(
        2
      ),
      breakdown,
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Loan Amount */}
      <div>
        <label className="block text-gray-700">Loan Amount *</label>
        <input
          type="number"
          step="0.01"
          {...register('loanAmount', { required: true, min: 0.01 })}
          className={`mt-1 block w-full p-2 border ${
            errors.loanAmount ? 'border-red-500' : 'border-gray-300'
          } rounded-md`}
        />
        {errors.loanAmount && (
          <span className="text-red-500 text-sm">Enter a valid amount.</span>
        )}
      </div>

      {/* Interest Rate */}
      <div>
        <label className="block text-gray-700">Interest Rate (%) *</label>
        <input
          type="number"
          step="0.01"
          {...register('interestRate', { required: true, min: 0.01 })}
          className={`mt-1 block w-full p-2 border ${
            errors.interestRate ? 'border-red-500' : 'border-gray-300'
          } rounded-md`}
        />
        {errors.interestRate && (
          <span className="text-red-500 text-sm">Enter a valid rate.</span>
        )}
      </div>

      {/* Loan Tenure */}
      <div className="flex space-x-2">
        <div className="flex-1">
          <label className="block text-gray-700">Loan Tenure *</label>
          <input
            type="number"
            step="1"
            {...register('loanTenure', { required: true, min: 1 })}
            className={`mt-1 block w-full p-2 border ${
              errors.loanTenure ? 'border-red-500' : 'border-gray-300'
            } rounded-md`}
          />
          {errors.loanTenure && (
            <span className="text-red-500 text-sm">
              Enter a valid tenure.
            </span>
          )}
        </div>
        <div className="flex items-end">
          <select
            {...register('tenureType')}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="months">Months</option>
            <option value="years">Years</option>
          </select>
        </div>
      </div>

      {/* Prepayment */}
      <div>
        <label className="block text-gray-700">
          Prepayment Amount (Optional)
        </label>
        <input
          type="number"
          step="0.01"
          {...register('prepayment', { min: 0 })}
          className={`mt-1 block w-full p-2 border ${
            errors.prepayment ? 'border-red-500' : 'border-gray-300'
          } rounded-md`}
        />
        {errors.prepayment && (
          <span className="text-red-500 text-sm">
            Enter a valid prepayment amount.
          </span>
        )}
      </div>

      {/* Submit Button */}
      <div className="text-center">
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Calculate EMI
        </button>
      </div>
    </form>
  );
};

export default EMIForm;
