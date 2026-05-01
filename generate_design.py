#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
URL Downloader Design System Generator

This script uses the UI/UX Pro Max skill's DesignSystemGenerator to create
a complete design system for the URL Downloader web application.

Usage:
    python generate_design.py
"""

import sys
import os

# Add the skills directory to the path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '.claude', 'skills', 'ui-ux-pro-max', 'scripts'))

from design_system import DesignSystemGenerator, generate_design_system, format_ascii_box, format_markdown


def generate_url_downloader_design():
    """Generate design system for URL Downloader application."""

    # Initialize the generator
    generator = DesignSystemGenerator()

    # Query for a video/streaming download tool - matches "Video Streaming/OTT" category
    query = "video downloader streaming media tool download youtube tiktok"
    project_name = "URL Downloader Pro"

    # Generate the design system
    design_system = generator.generate(query, project_name)

    # Also apply reasoning for specific UI components
    components = ["button", "input", "card", "layout", "typography"]
    component_reasoning = {}

    for component in components:
        reasoning = generator._apply_reasoning(component, {})
        component_reasoning[component] = reasoning

    return design_system, component_reasoning


def apply_reasoning_for_components(generator):
    """
    Apply reasoning rules for each UI component category.
    Returns design guidance for buttons, inputs, cards, etc.
    """

    # Categories from the ui-reasoning.csv that are relevant
    categories_to_check = [
        "SaaS (General)",           # General app patterns
        "Video Streaming/OTT",      # Most relevant for video downloader
        "Productivity Tool",        # Download tool is a productivity tool
        "Developer Tool/IDE",       # Technical tool aspects
    ]

    results = {}
    for category in categories_to_check:
        rule = generator._find_reasoning_rule(category)
        if rule:
            reasoning = generator._apply_reasoning(category, {})
            results[category] = reasoning

    return results


def print_design_recommendations(design_system, component_reasoning):
    """Print the design recommendations in a readable format."""

    print("\n" + "="*80)
    print("URL DOWNLOADER - DESIGN SYSTEM RECOMMENDATIONS")
    print("="*80)

    # Print main design system
    print(format_ascii_box(design_system))

    print("\n" + "="*80)
    print("COMPONENT-SPECIFIC REASONING")
    print("="*80)

    for component, reasoning in component_reasoning.items():
        print(f"\n--- {component.upper()} ---")
        print(f"  Pattern: {reasoning.get('pattern', 'N/A')}")
        print(f"  Style Priority: {reasoning.get('style_priority', [])}")
        print(f"  Color Mood: {reasoning.get('color_mood', 'N/A')}")
        print(f"  Typography Mood: {reasoning.get('typography_mood', 'N/A')}")
        print(f"  Key Effects: {reasoning.get('key_effects', 'N/A')}")
        print(f"  Severity: {reasoning.get('severity', 'N/A')}")
        if reasoning.get('anti_patterns'):
            print(f"  Anti-patterns: {reasoning.get('anti_patterns')}")


def generate_tailwind_config():
    """Generate Tailwind CSS custom classes based on design system."""

    tailwind_config = '''
/* URL Downloader - Custom Tailwind CSS Classes */
/* Generated from Design System */

/* Color Variables */
:root {
    --color-primary: #6366F1;      /* Indigo - main brand color */
    --color-secondary: #8B5CF6;    /* Purple - accent */
    --color-cta: #F97316;          /* Orange - call to action */
    --color-background: #0F172A;   /* Dark slate - dark mode bg */
    --color-surface: #1E293B;      /* Slate - cards, surfaces */
    --color-text: #F1F5F9;         /* Light text */
    --color-text-muted: #94A3B8;   /* Muted text */
    --color-success: #22C55E;      /* Green - success states */
    --color-error: #EF4444;        /* Red - error states */
    --color-warning: #F59E0B;      /* Amber - warnings */
}

/* Gradient Backgrounds */
.gradient-primary {
    background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%);
}

.gradient-cta {
    background: linear-gradient(135deg, #F97316 0%, #FB923C 100%);
}

.gradient-dark {
    background: linear-gradient(180deg, #0F172A 0%, #1E293B 100%);
}

/* Glassmorphism Effects */
.glass-dark {
    background: rgba(30, 41, 59, 0.8);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border: 1px solid rgba(148, 163, 184, 0.1);
}

.glass-light {
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 1px solid rgba(255, 255, 255, 0.2);
}

/* Button Styles */
.btn-primary {
    background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%);
    color: white;
    padding: 12px 24px;
    border-radius: 12px;
    font-weight: 600;
    transition: all 200ms ease;
    cursor: pointer;
    box-shadow: 0 4px 14px rgba(99, 102, 241, 0.4);
}

.btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(99, 102, 241, 0.5);
}

.btn-secondary {
    background: transparent;
    color: var(--color-primary);
    border: 2px solid var(--color-primary);
    padding: 12px 24px;
    border-radius: 12px;
    font-weight: 600;
    transition: all 200ms ease;
    cursor: pointer;
}

.btn-secondary:hover {
    background: rgba(99, 102, 241, 0.1);
}

/* Input Styles */
.input-primary {
    background: rgba(30, 41, 59, 0.6);
    border: 2px solid rgba(148, 163, 184, 0.2);
    border-radius: 12px;
    padding: 16px 20px;
    color: var(--color-text);
    font-size: 16px;
    transition: all 200ms ease;
}

.input-primary:focus {
    border-color: var(--color-primary);
    outline: none;
    box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.2);
}

/* Card Styles */
.card-elevated {
    background: var(--color-surface);
    border-radius: 16px;
    padding: 24px;
    border: 1px solid rgba(148, 163, 184, 0.1);
    transition: all 200ms ease;
    cursor: pointer;
}

.card-elevated:hover {
    transform: translateY(-4px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
    border-color: rgba(99, 102, 241, 0.3);
}

/* Platform Badge Colors */
.platform-youtube { background: linear-gradient(135deg, #FF0000 0%, #CC0000 100%); }
.platform-tiktok { background: linear-gradient(135deg, #00F2EA 0%, #FF0050 100%); }
.platform-instagram { background: linear-gradient(135deg, #833AB4 0%, #FD1D1D 50%, #F77737 100%); }
.platform-twitter { background: linear-gradient(135deg, #1DA1F2 0%, #0D8BD9 100%); }
.platform-vimeo { background: linear-gradient(135deg, #1AB7EA 0%, #162221 100%); }
.platform-soundcloud { background: linear-gradient(135deg, #FF5500 0%, #FF7700 100%); }
.platform-facebook { background: linear-gradient(135deg, #1877F2 0%, #166FE5 100%); }
.platform-twitch { background: linear-gradient(135deg, #9146FF 0%, #772CE8 100%); }
.platform-reddit { background: linear-gradient(135deg, #FF4500 0%, #FF5722 100%); }

/* Animation Utilities */
@keyframes pulse-glow {
    0%, 100% { box-shadow: 0 0 20px rgba(99, 102, 241, 0.4); }
    50% { box-shadow: 0 0 40px rgba(99, 102, 241, 0.6); }
}

.animate-pulse-glow {
    animation: pulse-glow 2s ease-in-out infinite;
}

@keyframes slide-up {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
}

.animate-slide-up {
    animation: slide-up 0.5s ease-out forwards;
}

/* Focus States (Accessibility) */
*:focus-visible {
    outline: 2px solid var(--color-primary);
    outline-offset: 2px;
}

/* Reduced Motion */
@media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
    }
}
'''
    return tailwind_config


def generate_component_specs():
    """Generate component specifications for the URL Downloader."""

    specs = {
        "UrlInput": {
            "description": "Main URL input component with platform auto-detection",
            "tailwind_classes": {
                "container": "relative w-full max-w-3xl mx-auto",
                "input": "w-full h-16 px-6 pr-32 text-lg bg-slate-800/60 border-2 border-slate-700 rounded-2xl text-white placeholder-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20 transition-all duration-200",
                "paste_button": "absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-medium transition-colors duration-200 cursor-pointer",
                "platform_badge": "absolute left-4 top-1/2 -translate-y-1/2 px-3 py-1 rounded-full text-xs font-bold text-white"
            },
            "states": {
                "idle": "border-slate-700",
                "focused": "border-indigo-500 ring-4 ring-indigo-500/20",
                "valid": "border-green-500",
                "invalid": "border-red-500",
                "loading": "border-indigo-500 animate-pulse"
            }
        },
        "FormatCard": {
            "description": "Card component for displaying download format options",
            "tailwind_classes": {
                "container": "bg-slate-800/50 border border-slate-700 rounded-2xl p-6 hover:border-indigo-500/50 hover:bg-slate-800/70 transition-all duration-200 cursor-pointer",
                "quality_badge": "inline-flex items-center px-3 py-1 bg-indigo-500/20 text-indigo-300 rounded-full text-sm font-semibold",
                "format_icon": "w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center",
                "download_button": "w-full mt-4 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white rounded-xl font-semibold transition-all duration-200 cursor-pointer"
            }
        },
        "CommandBlock": {
            "description": "Code block for displaying yt-dlp commands",
            "tailwind_classes": {
                "container": "bg-slate-900 border border-slate-700 rounded-xl overflow-hidden",
                "header": "flex items-center justify-between px-4 py-2 bg-slate-800 border-b border-slate-700",
                "code": "p-4 font-mono text-sm text-green-400 overflow-x-auto",
                "copy_button": "px-3 py-1 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded-lg text-sm transition-colors duration-200 cursor-pointer"
            }
        },
        "PlatformIndicator": {
            "description": "Visual indicator showing detected platform",
            "tailwind_classes": {
                "container": "inline-flex items-center gap-2 px-4 py-2 rounded-full",
                "icon": "w-5 h-5",
                "label": "text-sm font-semibold text-white"
            },
            "platform_colors": {
                "youtube": "bg-red-500/20 text-red-400 border-red-500/30",
                "tiktok": "bg-pink-500/20 text-pink-400 border-pink-500/30",
                "instagram": "bg-purple-500/20 text-purple-400 border-purple-500/30",
                "twitter": "bg-blue-400/20 text-blue-400 border-blue-400/30",
                "vimeo": "bg-cyan-500/20 text-cyan-400 border-cyan-500/30",
                "soundcloud": "bg-orange-500/20 text-orange-400 border-orange-500/30",
                "facebook": "bg-blue-600/20 text-blue-400 border-blue-600/30",
                "twitch": "bg-purple-600/20 text-purple-400 border-purple-600/30",
                "reddit": "bg-orange-600/20 text-orange-400 border-orange-600/30"
            }
        }
    }

    return specs


def main():
    """Main entry point."""
    # Set stdout to UTF-8 encoding for Windows
    import io
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')

    print("\nGenerating URL Downloader Design System...")
    print("-" * 50)

    # Generate design system
    design_system, component_reasoning = generate_url_downloader_design()

    # Print recommendations
    print_design_recommendations(design_system, component_reasoning)

    # Generate and save Tailwind config
    tailwind_css = generate_tailwind_config()
    print("\n" + "="*80)
    print("GENERATED TAILWIND CSS")
    print("="*80)
    print(tailwind_css)

    # Generate component specs
    component_specs = generate_component_specs()
    print("\n" + "="*80)
    print("COMPONENT SPECIFICATIONS")
    print("="*80)
    for name, spec in component_specs.items():
        print(f"\n--- {name} ---")
        print(f"  Description: {spec['description']}")
        print(f"  Classes:")
        for key, classes in spec['tailwind_classes'].items():
            print(f"    {key}: {classes}")

    # Save design system to markdown
    markdown_output = generate_design_system(
        "video downloader streaming media tool",
        "URL Downloader Pro",
        output_format="markdown",
        persist=True,
        output_dir=os.path.dirname(__file__)
    )

    print("\n" + "="*80)
    print("Design system saved to: design-system/url-downloader-pro/MASTER.md")
    print("="*80)

    return design_system, component_specs


if __name__ == "__main__":
    design_system, component_specs = main()
