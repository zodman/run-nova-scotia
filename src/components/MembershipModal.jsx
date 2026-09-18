import React, { useState } from 'react';
import { X, ExternalLink, Mail, CheckCircle2, ShieldCheck, Shirt, CreditCard, Banknote, ArrowRight } from 'lucide-react';

export default function MembershipModal({ plan, isOpen, onClose }) {
  if (!isOpen) return null;

  const [paymentMethod, setPaymentMethod] = useState('raceroster');
  const [shirtSize, setShirtSize] = useState('Unisex L');

  return (
    <div id="membership-modal-backdrop" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-fadeIn">
      <div 
        id="membership-modal-dialog"
        className="relative w-full max-w-2xl bg-dark-900 border border-dark-700 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div id="membership-modal-header" className="p-6 bg-dark-850 border-b border-dark-750 flex items-center justify-between">
          <div>
            <span id="membership-modal-eyebrow" className="text-xs uppercase font-athletic font-bold text-volt tracking-widest block mb-1">
              Official Membership Registration
            </span>
            <h3 id="membership-modal-title" className="text-2xl font-athletic font-bold uppercase text-white">
              {plan ? plan.name : "Run Nova Scotia Membership"} ({plan ? plan.price : "$35"})
            </h3>
          </div>

          <button 
            id="membership-modal-close-icon-btn"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-dark-800 hover:bg-volt hover:text-black text-slate-300 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div id="membership-modal-body" className="p-6 sm:p-8 overflow-y-auto space-y-6 text-slate-300 text-sm">
          
          {/* Method Selection Tabs */}
          <div id="membership-method-tabs">
            <label className="text-xs uppercase font-athletic font-bold text-slate-400 block mb-3">
              Select Registration Method:
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                id="membership-tab-raceroster"
                type="button"
                onClick={() => setPaymentMethod('raceroster')}
                className={`p-4 rounded-xl border text-left flex items-start space-x-3 transition-all cursor-pointer ${
                  paymentMethod === 'raceroster'
                    ? 'bg-dark-800 border-volt text-white shadow-lg'
                    : 'bg-dark-850 border-dark-750 text-slate-400 hover:border-dark-600'
                }`}
              >
                <CreditCard className={`w-5 h-5 flex-shrink-0 mt-0.5 ${paymentMethod === 'raceroster' ? 'text-volt' : 'text-slate-500'}`} />
                <div>
                  <div className="font-athletic text-sm uppercase font-bold text-white">Register via Race Roster</div>
                  <div className="text-xs text-slate-400 mt-0.5">Instant online confirmation & card payment</div>
                </div>
              </button>

              <button
                id="membership-tab-etransfer"
                type="button"
                onClick={() => setPaymentMethod('etransfer')}
                className={`p-4 rounded-xl border text-left flex items-start space-x-3 transition-all cursor-pointer ${
                  paymentMethod === 'etransfer'
                    ? 'bg-dark-800 border-volt text-white shadow-lg'
                    : 'bg-dark-850 border-dark-750 text-slate-400 hover:border-dark-600'
                }`}
              >
                <Banknote className={`w-5 h-5 flex-shrink-0 mt-0.5 ${paymentMethod === 'etransfer' ? 'text-volt' : 'text-slate-500'}`} />
                <div>
                  <div className="font-athletic text-sm uppercase font-bold text-white">Interac e-Transfer</div>
                  <div className="text-xs text-slate-400 mt-0.5">Direct bank transfer (no password needed)</div>
                </div>
              </button>
            </div>
          </div>

          {/* Option 1: Race Roster */}
          {paymentMethod === 'raceroster' && (
            <div id="membership-panel-raceroster" className="bg-dark-850 border border-dark-750 p-5 rounded-xl space-y-4">
              <div className="flex items-center space-x-3">
                <CheckCircle2 className="w-5 h-5 text-volt flex-shrink-0" />
                <span className="text-sm font-semibold text-white">Quickest Way to Register & Receive Member #</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Clicking below takes you directly to the official Run Nova Scotia membership portal on RaceRoster.com. 
                Your member number is generated automatically upon completion and linked to race sign-ups.
              </p>
              
              <a 
                id="membership-raceroster-btn"
                href="https://raceroster.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full py-3 bg-volt hover:bg-[#E5D800] text-black font-athletic font-bold text-sm uppercase tracking-wider rounded-lg transition-colors flex items-center justify-center space-x-2 shadow cursor-pointer"
              >
                <span>Proceed to Race Roster Portal</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          )}

          {/* Option 2: e-Transfer */}
          {paymentMethod === 'etransfer' && (
            <div id="membership-panel-etransfer" className="bg-dark-850 border border-dark-750 p-5 rounded-xl space-y-4 text-xs">
              <h4 className="text-sm font-athletic font-bold uppercase text-white">
                How to Pay by Interac e-Transfer:
              </h4>

              <ol className="list-decimal list-inside space-y-2 text-slate-300">
                <li>
                  Send membership payment ({plan ? plan.price : '$35'}) to: <strong className="text-volt font-mono select-all">admin@runnovascotia.ca</strong> (No password required).
                </li>
                <li>
                  Email the following details to Registrar Pam Dimock at: <strong className="text-volt font-mono select-all">pam.dimock@gmail.com</strong>
                </li>
              </ol>

              <div className="bg-dark-900 border border-dark-700 p-3 rounded-lg text-slate-300 space-y-1 font-mono text-[11px]">
                <p>• Full Name(s) & Gender</p>
                <p>• Date of Birth (YYYY-MM-DD)</p>
                <p>• Full Mailing Address & Phone Number</p>
                <p>• Email Address</p>
                <p>• Desired T-Shirt Size(s) (Unisex S to 2XL or Women XS to XL)</p>
                <p>• Confirmation of amount e-transferred</p>
              </div>

              <div className="pt-2">
                <a
                  id="membership-etransfer-email-btn"
                  href="mailto:pam.dimock@gmail.com?subject=Run%20Nova%20Scotia%20Membership%20Application&body=Hello%20Pam,%0D%0A%0D%0APlease%20find%20my%20membership%20application%20details%20below:%0D%0A- Full Name:%20%0D%0A- Gender:%20%0D%0A- Date of Birth:%20%0D%0A- Phone:%20%0D%0A- Mailing Address:%20%0D%0A- Shirt Size:%20%0D%0A- Amount e-transferred:%20"
                  className="inline-flex items-center space-x-2 text-xs font-athletic font-bold uppercase tracking-wider text-black bg-volt hover:bg-[#E5D800] px-4 py-2.5 rounded transition-colors cursor-pointer"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Open Pre-filled Email to Registrar</span>
                </a>
              </div>
            </div>
          )}

          {/* Shirt preview callout */}
          <div id="membership-shirt-note" className="bg-dark-850 p-4 rounded-xl border border-dark-750 flex items-center space-x-3 text-xs text-slate-300">
            <Shirt className="w-6 h-6 text-volt flex-shrink-0" />
            <div>
              <span className="font-semibold text-white block">Iconic Annual Member Tech Shirt</span>
              <span>Every registered member receives the 2026/2027 collector's technical shirt. Available for pickup at series races or shipped.</span>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div id="membership-modal-footer" className="p-4 sm:p-6 bg-dark-950 border-t border-dark-750 flex items-center justify-between">
          <span id="membership-modal-support-email" className="text-xs text-slate-400">Questions? admin@runnovascotia.ca</span>
          <button
            id="membership-modal-close-btn"
            onClick={onClose}
            className="px-5 py-2 text-xs font-athletic uppercase tracking-wider text-slate-300 hover:text-white border border-dark-700 rounded transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}
