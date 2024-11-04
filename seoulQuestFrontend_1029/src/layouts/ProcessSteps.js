import React from 'react';
import '../App.css';

const ProcessSteps = () => {
  return (
    <div className="process-container mt-20">
      <div className="process-step">
        <div className="process-connector"></div> {/* 왼쪽 점선 */}
        <div className="process-step-icon">❓</div>
        <div className="process-step-title">Questionnaire</div>
        <p className="process-description">Vous participez à la création des vêtements...</p>
      </div>
      
      <div className="process-step">
        <div className="process-connector"></div> {/* 왼쪽 점선 */}
        <div className="process-step-icon">✂️</div>
        <div className="process-step-title">Prototype</div>
        <p className="process-description">On file chez les meilleurs fabricants...</p>
      </div>

      <div className="process-step">
        <div className="process-connector"></div> {/* 왼쪽 점선 */}
        <div className="process-step-icon">🛍️</div>
        <div className="process-step-title">Précommande</div>
        <p className="process-description">Une fois le prototype calibré...</p>
      </div>

      <div className="process-step">
        <div className="process-connector"></div> {/* 왼쪽 점선 */}
        <div className="process-step-icon">🧵</div>
        <div className="process-step-title">Fabrication</div>
        <p className="process-description">Vos commandes sont transmises...</p>
      </div>

      <div className="process-step">
        <div className="process-connector"></div> {/* 왼쪽 점선 */}
        <div className="process-step-icon">➡️</div>
        <div className="process-step-title">Livraison</div>
        <p className="process-description">On vous livre où vous l'avez demandé...</p>
      </div>
    </div>
  );
};

export default ProcessSteps;
