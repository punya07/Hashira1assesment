# Secret Sharing Reconstruction with Lagrange Interpolation

This project implements a secret sharing reconstruction algorithm using polynomial shares stored in JSON format. It reads encoded polynomial share points, decodes the y-values from various numeral bases, and recovers the secret constant term \(C\) of the polynomial using Lagrange interpolation.

---

## Features

- Reads input shares from a JSON file (`testcase.json`).
- Supports decoding y-values encoded in arbitrary bases (e.g., binary, octal, decimal, hexadecimal, and beyond).
- Implements Lagrange interpolation at \(x=0\) to reconstruct the secret constant \(C\).
- Uses JavaScript `BigInt` for accurate handling of large integers.
- Easy to run with Node.js.

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) installed on your system.

### Installation

1. Clone or download this repository.
2. Place your share data JSON in the root folder as `testcase.json`.

The JSON file should follow this format:

