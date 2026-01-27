import React, { useState } from 'react';
import { TrendingUp, AlertTriangle, CheckCircle, XCircle, DollarSign, Activity, ArrowLeft, Database } from 'lucide-react';
import './App.css';

const CreditScoringApp = () => {
  const [page, setPage] = useState('dashboard');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [modelInfo, setModelInfo] = useState(null);
  const [formData, setFormData] = useState({
    creditAmount: '5000',
    duration: '24',
    age: '35',
    checkingStatus: 'no_account', // Neutre
    creditHistory: 'existing_paid_back',
    employment: '1',              
    savings: '0',                 
    purpose: 'radio_tv',
    installmentRate: '3',
    personalStatus: 'male_single',
    otherDebtors: 'none',
    residenceSince: '2',
    property: 'unknown_none',     
    otherInstallment: 'none',
    housing: 'rent',              
    existingCredits: '1',
    job: 'skilled_employee',
    peopleLiable: '1',
    telephone: 'none',
    foreignWorker: 'yes'          
  });
  const [prediction, setPrediction] = useState(null);

  const stats = {
    total: 1000,
    approvalRate: 70,
    highRisk: 30,
    recallBad: 82
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  React.useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:8000'}/model-info`)
      .then(res => res.json())
      .then(data => setModelInfo(data))
      .catch(err => console.error('Failed to fetch model info:', err));
  }, []);

  const handlePredict = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:8000'}/predict`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          checking_status: formData.checkingStatus,
          duration: parseInt(formData.duration),
          credit_history: formData.creditHistory,
          purpose: formData.purpose,
          credit_amount: parseFloat(formData.creditAmount),
          savings: formData.savings,
          employment: formData.employment,
          installment_rate: parseInt(formData.installmentRate),
          personal_status: formData.personalStatus,
          other_debtors: formData.otherDebtors,
          residence_since: parseInt(formData.residenceSince),
          property: formData.property,
          age: parseInt(formData.age),
          other_installment: formData.otherInstallment,
          housing: formData.housing,
          existing_credits: parseInt(formData.existingCredits),
          job: formData.job,
          people_liable: parseInt(formData.peopleLiable),
          telephone: formData.telephone,
          foreign_worker: formData.foreignWorker
        })
      });
      if (!response.ok) {
        throw new Error('Prediction failed');
      }
      const data = await response.json();
      setPrediction({
        score: data.score,
        probability: data.probability_bad,
        risk_level: data.risk_level
      });
      setPage('result');
    } catch (err) {
      setError('Failed to connect to the backend. Please make sure the API is running on http://localhost:8000');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen relative font-sans text-white selection:bg-pink-500 selection:text-white">
      <div 
        className="fixed inset-0 -z-30 bg-cover bg-center bg-no-repeat animate-bg-slow" 
      ></div>
      {/* Brillance (Gradient Bleu/Violet en mode incrustation) */}
      <div className="fixed inset-0 -z-20 bg-gradient-to-tr from-blue-900/40 via-purple-900/20 to-cyan-500/20 mix-blend-overlay"></div>
      {/*  Sombre ( texte lisible) */}
      <div className="fixed inset-0 -z-10 bg-slate-950/80 backdrop-blur-[1px]"></div>
      <header className="py-6 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between">
            <div>
                <h1 className="text-3xl font-light tracking-tight text-white">
                  CREDIT <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">ALPHA</span>
                </h1>
                <p className="text-slate-400 text-[10px] uppercase tracking-[0.3em] font-semibold mt-1 pl-1">
                  Financial Intelligence Unit
                </p>
            </div>
            {page === 'dashboard' ? (
              <button
                onClick={() => setPage('predict')}
                className="group relative px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 transition-all hover:shadow-[0_0_20px_rgba(56,189,248,0.3)] backdrop-blur-md overflow-hidden"
              >
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                <div className="flex items-center space-x-2">
                    <DollarSign className="w-4 h-4 text-cyan-300" />
                    <span className="font-medium tracking-wide">New Prediction</span>
                </div>
              </button>
            ) : (
              <button
                onClick={() => setPage('dashboard')}
                className="px-6 py-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-all flex items-center space-x-2 backdrop-blur-md"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Dashboard</span>
              </button>
            )}
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-6 py-8 relative z-10">
        {page === 'dashboard' && (
          <div className="space-y-8 animate-fade-in-up">
            <div>
              <h2 className="text-lg font-light text-slate-300 mb-6 flex items-center tracking-wide">
                <Activity className="w-5 h-5 mr-3 text-cyan-400" />
                LIVE PERFORMANCE
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="relative group bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 shadow-2xl transition-all hover:bg-white/10 hover:border-white/20 hover:scale-[1.02]">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">Total Requests</p>
                      <h3 className="text-4xl font-light text-white">{stats.total}</h3>
                    </div>
                    <div className="p-3 rounded-xl bg-blue-500/20 border border-blue-400/20 group-hover:shadow-[0_0_15px_rgba(59,130,246,0.5)] transition-shadow">
                      <Database className="w-6 h-6 text-blue-400" />
                    </div>
                  </div>
                </div>
                <div className="relative group bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 shadow-2xl transition-all hover:bg-white/10 hover:border-white/20 hover:scale-[1.02]">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">Approval Rate</p>
                      <h3 className="text-4xl font-light text-emerald-400">{stats.approvalRate}%</h3>
                    </div>
                    <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-400/20 group-hover:shadow-[0_0_15px_rgba(52,211,153,0.5)] transition-shadow">
                      <CheckCircle className="w-6 h-6 text-emerald-400" />
                    </div>
                  </div>
                </div>
                <div className="relative group bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 shadow-2xl transition-all hover:bg-white/10 hover:border-white/20 hover:scale-[1.02]">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">Risk Detected</p>
                      <h3 className="text-4xl font-light text-rose-400">{stats.highRisk}%</h3>
                    </div>
                    <div className="p-3 rounded-xl bg-rose-500/20 border border-rose-400/20 group-hover:shadow-[0_0_15px_rgba(251,113,133,0.5)] transition-shadow">
                      <AlertTriangle className="w-6 h-6 text-rose-400" />
                    </div>
                  </div>
                </div>
                 <div className="relative group bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 shadow-2xl transition-all hover:bg-white/10 hover:border-white/20 hover:scale-[1.02]">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">Sensitivity (Recall)</p>
                      <h3 className="text-4xl font-light text-violet-400">{stats.recallBad}%</h3>
                    </div>
                    <div className="p-3 rounded-xl bg-violet-500/20 border border-violet-400/20 group-hover:shadow-[0_0_15px_rgba(167,139,250,0.5)] transition-shadow">
                      <TrendingUp className="w-6 h-6 text-violet-400" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden">
                <div className="px-8 py-4 border-b border-white/5 flex items-center justify-between bg-white/5">
                    <h3 className="font-medium text-white flex items-center tracking-wide">
                        MODEL GOVERNANCE
                    </h3>
                    <div className="flex items-center space-x-2">
                        <span className="relative flex h-3 w-3">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                        </span>
                        <span className="text-emerald-400 text-xs font-bold uppercase tracking-wider">System Active</span>
                    </div>
                </div>
                <div className="p-8">
                  {modelInfo ? (
                    <div className="grid md:grid-cols-2 gap-12">
                      <div>
                         <h4 className="text-xs uppercase tracking-widest text-slate-500 font-bold mb-6 border-b border-white/10 pb-2">Technical Core</h4>
                         <ul className="space-y-5">
                            <li className="flex justify-between">
                                <span className="text-slate-400">Model Architecture</span>
                                <span className="font-mono text-cyan-300">{modelInfo.model_type}</span>
                            </li>
                            <li className="flex justify-between">
                                <span className="text-slate-400">Dataset Source</span>
                                <span className="text-white">{modelInfo.training_dataset}</span>
                            </li>
                            <li className="flex justify-between">
                                <span className="text-slate-400">Validation Split</span>
                                <span className="text-white">{modelInfo.validation_strategy}</span>
                            </li>
                         </ul>
                      </div>
                      <div>
                         <h4 className="text-xs uppercase tracking-widest text-slate-500 font-bold mb-6 border-b border-white/10 pb-2">Safety & Metrics</h4>
                         <ul className="space-y-5">
                            <li className="flex justify-between">
                                <span className="text-slate-400">Risk Detection Rate</span>
                                <span className="font-bold text-violet-400 text-lg">{(modelInfo.recall_bad * 100).toFixed(0)}%</span>
                            </li>
                            <li className="flex justify-between items-center">
                                <span className="text-slate-400">Bias Mitigation</span>
                                <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold flex items-center">
                                    <CheckCircle className="w-3 h-3 mr-1"/>
                                    Active
                                </span>
                            </li>
                         </ul>
                      </div>
                    </div>
                  ) : (
                    <div className="flex justify-center py-10">
                        <Activity className="w-8 h-8 text-cyan-400 animate-spin" />
                    </div>
                  )}
                </div>
            </div>
          </div>
        )}
        {page === 'predict' && (
          <div className="max-w-4xl mx-auto">
            <div className="bg-white/5 backdrop-blur-2xl rounded-3xl shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/10 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-900/40 to-slate-900/40 px-8 py-8 text-center border-b border-white/10">
                <h2 className="text-2xl font-light text-white flex items-center justify-center tracking-wide">
                  RUN SIMULATION
                </h2>
                <p className="text-slate-400 text-sm mt-2 font-light">Enter financial parameters to generate a credit risk score.</p>
              </div>

              <div className="p-10">
                {error && (
                  <div className="mb-8 bg-rose-500/10 border border-rose-500/30 rounded-xl p-4 flex items-center text-rose-300 animate-pulse">
                    <AlertTriangle className="w-5 h-5 mr-3" />
                    {error}
                  </div>
                )}

                <div className="space-y-10">
                  <div className="grid md:grid-cols-3 gap-8">
                    <div className="group">
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Credit Amount</label>
                      <div className="relative">
                          <DollarSign className="absolute left-4 top-3.5 w-4 h-4 text-slate-500 group-focus-within:text-cyan-400 transition-colors" />
                          <input
                          type="number"
                          name="creditAmount"
                          value={formData.creditAmount}
                          onChange={handleInputChange}
                          placeholder="5000"
                          className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-600 focus:bg-white/10 focus:border-cyan-400/50 focus:ring-1 focus:ring-cyan-400/50 outline-none transition-all"
                          />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Duration (Months)</label>
                      <input
                        type="number"
                        name="duration"
                        value={formData.duration}
                        onChange={handleInputChange}
                        placeholder="24"
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-600 focus:bg-white/10 focus:border-cyan-400/50 focus:ring-1 focus:ring-cyan-400/50 outline-none transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Age</label>
                      <input
                        type="number"
                        name="age"
                        value={formData.age}
                        onChange={handleInputChange}
                        placeholder="35"
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-600 focus:bg-white/10 focus:border-cyan-400/50 focus:ring-1 focus:ring-cyan-400/50 outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8">
                      <div>
                          <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Account Status</label>
                          <select
                              name="checkingStatus"
                              value={formData.checkingStatus}
                              onChange={handleInputChange}
                              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:bg-slate-800 focus:border-cyan-400/50 outline-none cursor-pointer appearance-none"
                          >
                              <option className="bg-slate-800" value="less_than_0_dm">Negative Balance</option>
                              <option className="bg-slate-800" value="0_to_200_dm">0 - 200 DM</option>
                              <option className="bg-slate-800" value="more_than_200_dm">&gt; 200 DM</option>
                              <option className="bg-slate-800" value="no_account">No Account</option>
                          </select>
                      </div>
                      <div>
                          <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Credit History</label>
                          <select
                              name="creditHistory"
                              value={formData.creditHistory}
                              onChange={handleInputChange}
                              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:bg-slate-800 focus:border-cyan-400/50 outline-none cursor-pointer appearance-none"
                          >
                              <option className="bg-slate-800" value="no_credits_taken">Clean History</option>
                              <option className="bg-slate-800" value="all_paid_back">All Paid Back</option>
                              <option className="bg-slate-800" value="existing_paid_back">Existing Paid Back</option>
                              <option className="bg-slate-800" value="delay_in_payment">Past Delays</option>
                              <option className="bg-slate-800" value="critical_account">Critical Account</option>
                          </select>
                      </div>
                  </div>
                  <button
                    onClick={handlePredict}
                    disabled={loading}
                    className="w-full group relative px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold tracking-widest uppercase transition-all hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
                  >
                    <div className="absolute inset-0 w-full h-full bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"></div>
                    <div className="relative flex items-center justify-center space-x-3">
                        {loading ? (
                        <>
                            <Activity className="w-5 h-5 animate-spin" />
                            <span>Processing...</span>
                        </>
                        ) : (
                        <>
                            <TrendingUp className="w-5 h-5" />
                            <span>Generate Score</span>
                        </>
                        )}
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        {page === 'result' && prediction && (
          <div className="flex justify-center items-center py-10 animate-fade-in-up">
            <div className={`relative bg-white/10 backdrop-blur-2xl rounded-3xl p-10 max-w-xl w-full text-center border shadow-[0_0_60px_rgba(0,0,0,0.5)] ${
                prediction.risk_level === 'Good' 
                    ? 'border-emerald-500/30 shadow-emerald-500/10' 
                    : 'border-rose-500/30 shadow-rose-500/10'
            }`}>
                <div className="mb-8 flex justify-center">
                    {prediction.risk_level === 'Good' ? (
                        <div className="relative">
                            <div className="absolute inset-0 bg-emerald-500 blur-2xl opacity-20 animate-pulse"></div>
                            <CheckCircle className="w-24 h-24 text-emerald-400 relative z-10" strokeWidth={1} />
                        </div>
                    ) : (
                        <div className="relative">
                            <div className="absolute inset-0 bg-rose-500 blur-2xl opacity-20 animate-pulse"></div>
                            <XCircle className="w-24 h-24 text-rose-400 relative z-10" strokeWidth={1} />
                        </div>
                    )}
                </div>
                <h2 className="text-5xl font-thin text-white mb-2 tracking-tighter">
                    {prediction.risk_level === 'Good' ? 'APPROVED' : 'DECLINED'}
                </h2>
                <p className="text-slate-400 uppercase tracking-[0.2em] text-xs font-bold mb-10">Algorithm Decision Final</p>

                <div className="grid grid-cols-2 gap-6 mb-10">
                  <div className="bg-black/20 rounded-2xl p-4 border border-white/5">
                    <p className="text-slate-500 text-[10px] font-bold uppercase mb-1">Score</p>
                    <h3 className="text-4xl font-light text-white">{prediction.score}</h3>
                  </div>
                  
                  <div className="bg-black/20 rounded-2xl p-4 border border-white/5">
                    <p className="text-slate-500 text-[10px] font-bold uppercase mb-1">Probability</p>
                    <h3 className={`text-4xl font-light ${
                        prediction.risk_level === 'Good' ? 'text-emerald-400' : 'text-rose-400'
                    }`}>
                        {Math.round(prediction.probability * 100)}%
                    </h3>
                  </div>
                </div>
                <div className="flex gap-4">
                  <button
                    onClick={() => setPage('predict')}
                    className="flex-1 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 font-medium transition-all"
                  >
                    Reset
                  </button>
                  <button
                    onClick={() => setPage('dashboard')}
                    className="flex-1 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold transition-all shadow-[0_0_20px_rgba(6,182,212,0.4)]"
                  >
                    Dashboard
                  </button>
                </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
export default CreditScoringApp;