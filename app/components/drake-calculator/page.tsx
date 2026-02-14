/**
 * Drake Equation Love Calculator Page
 * 
 * Route: /drake-equation
 * 
 * This page renders the Drake Equation calculator component which implements
 * the mathematical algorithm for estimating potential romantic partners.
 * 
 * Algorithm Location: /algorithms/drake-equation/
 * Component Location: /components/drake-calculator/
 */

import DrakeCalculator from "./DrakeCalculator";

export default function DrakeEquationPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-8 px-4">
      <DrakeCalculator />
    </main>
  );
}