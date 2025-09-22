import React, { useState } from 'react';
import { 
  Play,
  BookOpen,
  Award,
  Clock,
  Users,
  CheckCircle,
  ArrowRight,
  Smartphone,
  Globe,
  CreditCard,
  TrendingUp,
  Star
} from 'lucide-react';

interface Course {
  id: string;
  title: string;
  description: string;
  category: string;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  students: number;
  rating: number;
  lessons: number;
  completed?: boolean;
  progress?: number;
}

export default function LearnView() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const courses: Course[] = [
    {
      id: '1',
      title: 'Getting Your Business Online',
      description: 'Learn how to create a digital presence for your business, from social media to basic websites.',
      category: 'Digital Basics',
      duration: '2 hours',
      level: 'Beginner',
      students: 1247,
      rating: 4.8,
      lessons: 8,
      progress: 75,
      completed: false
    },
    {
      id: '2',
      title: 'WhatsApp Business for Entrepreneurs',
      description: 'Master WhatsApp Business features to communicate with customers and grow your business.',
      category: 'Digital Marketing',
      duration: '1.5 hours',
      level: 'Beginner',
      students: 892,
      rating: 4.9,
      lessons: 6,
      progress: 100,
      completed: true
    },
    {
      id: '3',
      title: 'Basic Bookkeeping and Finance',
      description: 'Keep track of your money, understand profit and loss, and manage cash flow effectively.',
      category: 'Finance',
      duration: '3 hours',
      level: 'Beginner',
      students: 756,
      rating: 4.7,
      lessons: 12,
      progress: 25,
      completed: false
    },
    {
      id: '4',
      title: 'Customer Service Excellence',
      description: 'Build customer loyalty and increase sales through exceptional service.',
      category: 'Business Skills',
      duration: '2.5 hours',
      level: 'Intermediate',
      students: 623,
      rating: 4.6,
      lessons: 10,
    },
    {
      id: '5',
      title: 'Digital Payments and Banking',
      description: 'Learn about digital payment options, mobile banking, and financial technology.',
      category: 'Finance',
      duration: '2 hours',
      level: 'Beginner',
      students: 445,
      rating: 4.8,
      lessons: 8,
    },
    {
      id: '6',
      title: 'Social Media Marketing',
      description: 'Use Facebook, Instagram, and other platforms to promote your business effectively.',
      category: 'Digital Marketing',
      duration: '4 hours',
      level: 'Intermediate',
      students: 892,
      rating: 4.5,
      lessons: 16,
    }
  ];

  const categories = [
    { id: 'all', name: 'All Courses', count: courses.length },
    { id: 'Digital Basics', name: 'Digital Basics', count: courses.filter(c => c.category === 'Digital Basics').length },
    { id: 'Digital Marketing', name: 'Digital Marketing', count: courses.filter(c => c.category === 'Digital Marketing').length },
    { id: 'Finance', name: 'Finance', count: courses.filter(c => c.category === 'Finance').length },
    { id: 'Business Skills', name: 'Business Skills', count: courses.filter(c => c.category === 'Business Skills').length },
  ];

  const filteredCourses = selectedCategory === 'all' 
    ? courses 
    : courses.filter(course => course.category === selectedCategory);

  const completedCourses = courses.filter(c => c.completed).length;
  const inProgressCourses = courses.filter(c => c.progress && c.progress > 0 && !c.completed).length;

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Beginner': return 'bg-orange-100 text-warm-orange';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-700';
      case 'Advanced': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Digital Basics': return Smartphone;
      case 'Digital Marketing': return Globe;
      case 'Finance': return CreditCard;
      case 'Business Skills': return TrendingUp;
      default: return BookOpen;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Learning Centre</h1>
        <p className="text-gray-600">Build digital skills to grow your township business</p>
      </div>

      {/* Progress Overview */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-off-white p-6 rounded-xl shadow-3d border border-gray-200 animate-fade-in">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="h-5 w-5 text-warm-orange" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Completed</h3>
              <p className="text-2xl font-bold text-warm-orange">{completedCourses}</p>
            </div>
          </div>
          <p className="text-sm text-gray-600">Courses finished</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <BookOpen className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">In Progress</h3>
              <p className="text-2xl font-bold text-blue-600">{inProgressCourses}</p>
            </div>
          </div>
          <p className="text-sm text-gray-600">Currently learning</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Award className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Certificates</h3>
              <p className="text-2xl font-bold text-purple-600">{completedCourses}</p>
            </div>
          </div>
          <p className="text-sm text-gray-600">Earned certificates</p>
        </div>
      </div>

      {/* Categories */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h2 className="font-semibold text-gray-800 mb-4">Course Categories</h2>
        <div className="flex flex-wrap gap-3">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                selectedCategory === category.id
                  ? 'bg-orange-100 text-warm-orange border-warm-orange'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              } border shadow-3d hover:shadow-lg transform hover:scale-105`}
            >
              {category.name} ({category.count})
            </button>
          ))}
        </div>
      </div>

      {/* Featured Course */}
      <div className="bg-gradient-to-r from-warm-orange to-orange-400 text-white rounded-2xl p-8 animate-fade-in">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between">
          <div className="flex-1 mb-6 lg:mb-0">
            <h3 className="text-2xl font-bold mb-2">🚀 Featured Course</h3>
            <h4 className="text-xl font-semibold mb-3">Township Digital Transformation</h4>
            <p className="text-orange-100 mb-4">
              A comprehensive course covering everything you need to digitize your township business, 
              from creating an online presence to accepting digital payments.
            </p>
            <div className="flex items-center gap-4 text-orange-100">
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span className="text-sm">6 hours</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                <span className="text-sm">2,156 students</span>
              </div>
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 text-yellow-300 fill-current" />
                <span className="text-sm">4.9</span>
              </div>
            </div>
          </div>
          <button className="bg-white text-warm-orange px-6 py-3 rounded-lg font-semibold hover:bg-orange-50 transition-all duration-300 shadow-3d hover:shadow-lg transform hover:scale-105 flex items-center gap-2 lg:ml-8">
            Start Learning
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Course Grid */}
      <div>
        <h2 className="font-semibold text-gray-800 mb-4">
          {selectedCategory === 'all' ? 'All Courses' : `${selectedCategory} Courses`}
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => {
            const IconComponent = getCategoryIcon(course.category);
            return (
              <div key={course.id} className="bg-off-white rounded-xl shadow-3d border border-gray-200 hover:shadow-lg transition-all duration-300 animate-fade-in">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                      <IconComponent className="h-6 w-6 text-gray-600" />
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getLevelColor(course.level)}`}>
                      {course.level}
                    </span>
                  </div>
                  
                  <h3 className="font-semibold text-gray-800 mb-2">{course.title}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{course.description}</p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <BookOpen className="h-4 w-4" />
                      <span>{course.lessons} lessons</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Users className="h-4 w-4" />
                      <span>{course.students.toLocaleString()} students</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-semibold">{course.rating}</span>
                    </div>
                  </div>

                  {course.progress !== undefined && (
                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">Progress</span>
                        <span className="font-semibold">{course.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-warm-orange h-2 rounded-full transition-all duration-300"
                          style={{ width: `${course.progress}%` }}
                        />
                      </div>
                    </div>
                  )}
                  
                  <button className="w-full bg-warm-orange text-white py-3 rounded-lg font-semibold hover:bg-orange-400 transition-all duration-300 shadow-3d hover:shadow-lg transform hover:scale-105 flex items-center justify-center gap-2">
                    {course.completed ? (
                      <>
                        <CheckCircle className="h-4 w-4" />
                        Completed
                      </>
                    ) : course.progress ? (
                      <>
                        <Play className="h-4 w-4" />
                        Continue Learning
                      </>
                    ) : (
                      <>
                        <Play className="h-4 w-4" />
                        Start Course
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Learning Tips */}
      <div className="bg-blue-50 p-6 rounded-xl">
        <h3 className="font-semibold text-gray-800 mb-3">💡 Learning Tips</h3>
        <ul className="space-y-2 text-gray-700">
          <li>• Start with beginner courses if you're new to digital tools</li>
          <li>• Practice what you learn immediately in your business</li>
          <li>• Join our community discussions to learn from other entrepreneurs</li>
          <li>• Complete courses to earn certificates for your business profile</li>
          <li>• Most courses work offline - download lessons when you have good internet</li>
        </ul>
      </div>
    </div>
  );
}